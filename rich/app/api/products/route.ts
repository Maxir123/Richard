// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecretKey) {
      console.error('❌ PAYSTACK_SECRET_KEY not configured');
      return NextResponse.json(
        { error: 'Paystack secret key not configured' },
        { status: 500 }
      );
    }

    console.log('🔄 Fetching products from Paystack...');
    const response = await fetch('https://api.paystack.co/product?perPage=10', {
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('❌ Paystack API error:', response.status, response.statusText);
      throw new Error(`Paystack API error: ${response.status}`);
    }

    const data = await response.json();
    
    
    return NextResponse.json({
      products: data.data || [],
      total: data.meta?.total || 0
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}