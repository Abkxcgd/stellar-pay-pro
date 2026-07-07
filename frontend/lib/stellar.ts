import * as StellarSdk from '@stellar/js-sdk';

const server = new StellarSdk.Server(process.env.NEXT_PUBLIC_STELLAR_TESTNET_RPC || 'https://soroban-testnet.stellar.org');

/**
 * Fetch balance for a Stellar address
 */
export async function fetchBalance(address: string): Promise<number> {
  try {
    const account = await server.accounts().accountId(address).call();
    const balance = account.balances.find((b: any) => b.asset_type === 'native')?.balance || '0';
    return parseFloat(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw new Error('Failed to fetch balance');
  }
}

/**
 * Fetch transaction history for a Stellar address
 */
export async function fetchTransactionHistory(
  address: string,
  limit: number = 20
): Promise<any[]> {
  try {
    const transactions = await server
      .transactions()
      .forAccount(address)
      .limit(limit)
      .order('desc')
      .call();

    return transactions.records.map((tx: any) => ({
      id: tx.id,
      hash: tx.hash,
      timestamp: tx.created_at,
      operations: tx.operation_count,
      fee: tx.fee_charged,
      status: 'success',
    }));
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw new Error('Failed to fetch transaction history');
  }
}

/**
 * Send XLM payment
 */
export async function sendPayment(params: {
  fromAddress: string;
  toAddress: string;
  amount: string;
  memo?: string;
  signTransaction: (xdr: string) => Promise<string>;
}): Promise<{
  hash?: string;
  status: 'success' | 'error' | 'pending';
  message: string;
}> {
  try {
    // Get source account
    const sourceAccount = await server.loadAccount(params.fromAddress);

    // Build transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: process.env.NEXT_PUBLIC_FREIGHTER_NETWORK_PASSPHRASE || StellarSdk.Networks.TESTNET_NETWORK_PASSPHRASE,
    })
      .addMemo(params.memo ? StellarSdk.Memo.text(params.memo) : StellarSdk.Memo.none())
      .addOperation(
        StellarSdk.Operation.payment({
          destination: params.toAddress,
          asset: StellarSdk.Asset.native(),
          amount: params.amount,
        })
      )
      .setTimeout(30)
      .build();

    // Sign transaction
    const signedXdr = await params.signTransaction(transaction.toXDR());
    const signedTx = StellarSdk.TransactionBuilder.fromXDR(
      signedXdr,
      process.env.NEXT_PUBLIC_FREIGHTER_NETWORK_PASSPHRASE || StellarSdk.Networks.TESTNET_NETWORK_PASSPHRASE
    );

    // Submit transaction
    const response = await server.submitTransaction(signedTx as StellarSdk.Transaction);

    return {
      hash: response.hash,
      status: 'success',
      message: 'Payment sent successfully',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send payment';
    console.error('Error sending payment:', error);
    return {
      status: 'error',
      message: errorMessage,
    };
  }
}

/**
 * Get account details
 */
export async function getAccountDetails(address: string) {
  try {
    const account = await server.accounts().accountId(address).call();
    return {
      id: account.id,
      accountId: account.account_id,
      sequenceNumber: account.sequence,
      subentryCount: account.subentry_count,
      balances: account.balances,
      signers: account.signers,
      data: account.data_attr,
    };
  } catch (error) {
    console.error('Error fetching account details:', error);
    throw new Error('Failed to fetch account details');
  }
}

/**
 * Validate Stellar address
 */
export function isValidStellarAddress(address: string): boolean {
  try {
    StellarSdk.StrKey.decodeCheck('account', address);
    return true;
  } catch {
    return false;
  }
}
