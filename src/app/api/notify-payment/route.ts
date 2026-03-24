import { NextRequest, NextResponse } from 'next/server';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!WEB3FORMS_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'Web3Forms not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('=== notify-payment received ===');
    console.log('Body:', JSON.stringify(body, null, 2));
    console.log('WEB3FORMS_ACCESS_KEY exists:', !!WEB3FORMS_ACCESS_KEY);
    const { title, name, email, message, amount, paymentId, selectedServices, status } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let subject: string;
    let messageContent: string;

    if (status === 'Custom Quote') {
      subject = `📝 New Custom Quote Request - ₹${amount}`;
      messageContent = `${message || 'No message'}\n\n---\nSelected Services:\n${selectedServices || 'None'}\n\nTotal Amount: ₹${amount}\nStatus: Custom Quote (No Payment)`;
    } else {
      subject = `💰 Payment Received - ${title} - ₹${amount}`;
      messageContent = `${message || 'No message'}\n\n---\nService: ${title}\nAmount Paid: ₹${amount}\nPayment ID: ${paymentId || 'N/A'}\nStatus: Payment Successful`;
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: name,
        email: email,
        message: messageContent,
      }),
    });

    const responseText = await response.text();
    console.log('Web3Forms raw response:', responseText.substring(0, 500));

    let data: { success?: boolean; message?: string };
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse Web3Forms response as JSON. Got:', responseText.substring(0, 200));
      return NextResponse.json(
        { error: 'Failed to send notification', details: 'Invalid response from Web3Forms' },
        { status: 500 }
      );
    }

    console.log('Web3Forms response:', { status: response.status, success: data.success, message: data.message });

    if (!data.success) {
      console.error('Web3Forms error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to send notification' },
        { status: 400 }
      );
    }

    console.log('Web3Forms submission successful for:', email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('=== Payment notification error ===');
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error message:', errorMessage);
    console.error('==============================');
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}