// lib/paystack.ts
import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Create axios client for Paystack API
export const paystackClient = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Utility functions
export async function initializePayment(params: {
  email: string;
  amount: number;
  reference: string;
  callback_url?: string;
  metadata?: any;
}) {
  const response = await paystackClient.post('/transaction/initialize', params);
  return response.data;
}

export async function verifyPayment(reference: string) {
  const response = await paystackClient.get(`/transaction/verify/${reference}`);
  return response.data;
}

export async function fetchProduct(productId: string) {
  const response = await paystackClient.get(`/product/${productId}`);
  return response.data;
}

export async function listProducts(params?: {
  perPage?: number;
  page?: number;
}) {
  const response = await paystackClient.get('/product', { params });
  return response.data;
}