import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      authorId,
      images,
      isFeatured,
      isArchived,
    } = body;

    // if (!userId) {
    //   return new NextResponse('Unauthenticated', { status: 401 });
    // }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
    }

    if (!authorId) {
      return new NextResponse('Author ID is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
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

    const book = await prisma.book.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        authorId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log('PRODUCTS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const authorId = searchParams.get('authorId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const books = await prisma.book.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        authorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.log('PRODUCTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
