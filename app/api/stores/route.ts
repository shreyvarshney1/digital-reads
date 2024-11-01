import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const role = session?.user?.role;
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
