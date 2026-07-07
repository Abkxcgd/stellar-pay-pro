import { NextRequest, NextResponse } from 'next/server';

interface SendPaymentRequest {
  fromAddress: string;
  toAddress: string;
  amount: string;
  memo?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendPaymentRequest = await request.json();

    // Validation
    if (!body.fromAddress || !body.toAddress || !body.amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (parseFloat(body.amount) <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // TODO: Implement actual transaction signing with Freighter
    // This would be handled on the client side
    return NextResponse.json({
      status: 'pending',
      message: 'Transaction should be signed on client side',
    });
  } catch (error) {
    console.error('Error processing transaction:', error);
    return NextResponse.json(
      { error: 'Failed to process transaction' },
      { status: 500 }
    );
  }
}
