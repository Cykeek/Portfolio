import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, service, paymentId, amount } = body;

    if (!name || !email || !message || !service || !paymentId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!web3FormsKey) {
      console.error('WEB3FORMS_ACCESS_KEY not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        subject: `💰 Payment Received - ${service} - ₹${amount}`,
        from_name: name,
        email: email,
        message: `${message}\n\n---\nService: ${service}\nAmount Paid: ₹${amount}\nPayment ID: ${paymentId}\nStatus: Payment Successful`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: data.message || 'Submission failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
