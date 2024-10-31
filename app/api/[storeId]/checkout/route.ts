import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { bookIds } = await req.json();

  if (!bookIds || bookIds.length === 0) {
    return new NextResponse('Book ids are required', { status: 400 });
  }

  const books = await prisma.book.findMany({
    where: {
      id: {
        in: bookIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  books.forEach((book) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: book.name,
        },
        unit_amount: book.price.toNumber() * 100,
      },
    });
  });

  const order = await prisma.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: bookIds.map((bookId: string) => ({
          book: {
            connect: {
              id: bookId,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
