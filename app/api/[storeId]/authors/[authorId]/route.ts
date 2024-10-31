import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; authorId: string } }
) {
  try {
    // const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    // if (!userId) {
    //   return new NextResponse('Unauthenticated', { status: 401 });
    // }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!params.authorId) {
      return new NextResponse('Author ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        // userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const author = await prisma.author.updateMany({
      where: {
        id: params.authorId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; authorId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse('Unauthenticated', { status: 401 });
    // }

    if (!params.authorId) {
      return new NextResponse('Author ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        // userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const author = await prisma.author.deleteMany({
      where: {
        id: params.authorId,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { authorId: string } }
) {
  try {
    if (!params.authorId) {
      return new NextResponse('Author ID is required', { status: 400 });
    }

    const author = await prisma.author.findUnique({
      where: {
        id: params.authorId,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
