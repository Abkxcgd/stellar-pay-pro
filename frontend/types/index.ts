/**
 * Type definitions for the application
 */

export interface Wallet {
  id: string;
  address: string;
  publicKey: string;
  network: 'testnet' | 'mainnet';
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: string;
  fee: string;
  status: 'success' | 'failed' | 'pending';
  type: 'send' | 'receive' | 'contract';
  memo?: string;
  timestamp: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  creator: string;
  goal: number; // in XLM
  raised: number; // in XLM
  image?: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  endsAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  creator: string;
  recipient: string;
  amount: number; // in XLM
  description: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
  paidAt?: string;
}

export interface User {
  id: string;
  address: string;
  name?: string;
  email?: string;
  avatar?: string;
  createdAt: string;
}

export interface PaymentRequest {
  toAddress: string;
  amount: string;
  memo?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}
