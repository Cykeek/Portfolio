import { NextRequest, NextResponse } from 'next/server';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const VALID_PLANS: Record<string, number> = {
  'brand-setup': 4999,
  'startup-plan': 14999,
  'growth-plan': 49999,
};

export async function POST(request: NextRequest) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { planName, isPartialPayment } = body;

    if (!planName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const planKey = planName.toLowerCase().replace(/\s+/g, '-');
    const totalAmount = VALID_PLANS[planKey];

    if (!totalAmount) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const amount = isPartialPayment ? Math.round(totalAmount * 0.5) : totalAmount;
    const amountInPaise = amount * 100;

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          planName,
          isPartialPayment: isPartialPayment ? 'true' : 'false',
          originalAmount: totalAmount.toString(),
        },
      }),
    });

    const orderData = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      return NextResponse.json(
        { error: orderData.error?.description || 'Failed to create order' },
        { status: razorpayResponse.status }
      );
    }

    return NextResponse.json({
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId: RAZORPAY_KEY_ID,
      amountInRs: amount,
      totalAmount,
      isPartialPayment: !!isPartialPayment,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
