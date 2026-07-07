import { NextRequest, NextResponse } from 'next/server';

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  type: 'send' | 'receive';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    // TODO: Fetch real transaction history from Stellar
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        hash: 'abc123',
        from: address,
        to: 'GXXXXX',
        amount: '100',
        status: 'success',
        timestamp: new Date().toISOString(),
        type: 'send',
      },
    ];

    return NextResponse.json({
      transactions: mockTransactions.slice(0, limit),
      total: mockTransactions.length,
    });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction history' },
      { status: 500 }
    );
  }
}
