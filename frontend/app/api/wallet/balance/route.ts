import { NextRequest, NextResponse } from 'next/server';
import { Server } from '@stellar/js-sdk';

const server = new Server(process.env.NEXT_PUBLIC_STELLAR_TESTNET_RPC || 'https://soroban-testnet.stellar.org');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    const account = await server.accounts().accountId(address).call();
    const balance = account.balances.find((b: any) => b.asset_type === 'native')?.balance || '0';

    return NextResponse.json({
      address,
      balance: parseFloat(balance),
      currency: 'XLM',
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}
