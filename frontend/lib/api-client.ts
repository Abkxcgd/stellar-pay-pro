import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Wallet APIs
  getBalance: (address: string) =>
    apiClient.get(`/wallet/balance`, { params: { address } }),

  // Transaction APIs
  sendPayment: (data: any) =>
    apiClient.post('/transactions/send', data),

  getTransactionHistory: (address: string, limit?: number) =>
    apiClient.get('/transactions/history', {
      params: { address, limit },
    }),

  // Campaign APIs
  getCampaigns: () => apiClient.get('/campaigns'),
  createCampaign: (data: any) => apiClient.post('/campaigns', data),
  getCampaignDetails: (id: string) => apiClient.get(`/campaigns/${id}`),
  donateToCampaign: (id: string, data: any) =>
    apiClient.post(`/campaigns/${id}/donate`, data),

  // Invoice APIs
  getInvoices: () => apiClient.get('/invoices'),
  createInvoice: (data: any) => apiClient.post('/invoices', data),
  getInvoiceDetails: (id: string) => apiClient.get(`/invoices/${id}`),

  // Analytics APIs
  getDashboardStats: () => apiClient.get('/analytics/dashboard'),
  getTransactionStats: () => apiClient.get('/analytics/transactions'),
  getWalletStats: () => apiClient.get('/analytics/wallets'),
};

export default apiClient;
