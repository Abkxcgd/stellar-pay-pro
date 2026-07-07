/**
 * Soroban contract constants and utilities
 */

export const CONTRACT_IDS = {
  PAYMENT: process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ID || '',
  DONATION: process.env.NEXT_PUBLIC_DONATION_CONTRACT_ID || '',
  CAMPAIGN: process.env.NEXT_PUBLIC_CAMPAIGN_CONTRACT_ID || '',
  RECURRING: process.env.NEXT_PUBLIC_RECURRING_CONTRACT_ID || '',
};

export const SOROBAN_RPC = process.env.NEXT_PUBLIC_STELLAR_TESTNET_RPC || 'https://soroban-testnet.stellar.org';

export const NETWORK = {
  passphrase: process.env.NEXT_PUBLIC_FREIGHTER_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015',
  name: 'testnet',
};

export const TRANSACTION_TIMEOUT = 30000; // 30 seconds
export const WALLET_TIMEOUT = 30000; // 30 seconds
const MIN_BALANCE = 1; // Minimum XLM balance

export const CONSTANTS = {
  TRANSACTION_TIMEOUT,
  WALLET_TIMEOUT,
  MIN_BALANCE,
  CONFIRMATION_BLOCKS: 1,
  GAS_LIMIT: 100000,
};
