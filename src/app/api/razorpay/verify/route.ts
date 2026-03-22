import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

function razorpayAuthHeader(): string {
  return `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const signaturePayload = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(signaturePayload)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const auth = { Authorization: razorpayAuthHeader() };

    const payRes = await fetch(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
      { headers: auth }
    );

    const payRaw = await payRes.text();
    let payment: {
      order_id?: string;
      amount?: number;
      status?: string;
    };
    try {
      payment = JSON.parse(payRaw) as typeof payment;
    } catch {
      return NextResponse.json(
        { error: 'Invalid payment response from gateway' },
        { status: 502 }
      );
    }

    if (!payRes.ok) {
      return NextResponse.json(
        { error: (payment as { error?: { description?: string } }).error?.description || 'Payment lookup failed' },
        { status: 400 }
      );
    }

    if (payment.order_id !== razorpay_order_id) {
      return NextResponse.json(
        { error: 'Payment does not match order' },
        { status: 400 }
      );
    }

    const okStatuses = ['captured', 'authorized'];
    if (!payment.status || !okStatuses.includes(payment.status)) {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    const ordRes = await fetch(
      `https://api.razorpay.com/v1/orders/${razorpay_order_id}`,
      { headers: auth }
    );

    const ordRaw = await ordRes.text();
    let order: { amount?: number; status?: string };
    try {
      order = JSON.parse(ordRaw) as typeof order;
    } catch {
      return NextResponse.json(
        { error: 'Invalid order response from gateway' },
        { status: 502 }
      );
    }

    if (!ordRes.ok) {
      return NextResponse.json(
        { error: 'Order lookup failed' },
        { status: 400 }
      );
    }

    if (
      typeof payment.amount === 'number' &&
      typeof order.amount === 'number' &&
      payment.amount !== order.amount
    ) {
      return NextResponse.json(
        { error: 'Amount mismatch' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error('Razorpay verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
