import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const role = session?.user?.role;
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const author = await prisma.author.create({
      data: {
        name,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log('SIZES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const authors = await prisma.author.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.log('SIZES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
