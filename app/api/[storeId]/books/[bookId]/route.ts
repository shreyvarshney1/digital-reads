import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; bookId: string } }
) {
  try {
    // const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
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

    if (!colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    if (!authorId) {
      return new NextResponse('Author ID is required', { status: 400 });
    }

    if (!params.bookId) {
      return new NextResponse('Book ID is required', { status: 400 });
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

    await prisma.book.update({
      where: {
        id: params.bookId,
      },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        authorId,
        images: {
          deleteMany: {},
        },
      },
    });

    const book = await prisma.book.update({
      where: {
        id: params.bookId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; bookId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse('Unauthenticated', { status: 401 });
    // }

    if (!params.bookId) {
      return new NextResponse('Book ID is required', { status: 400 });
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

    const book = await prisma.book.deleteMany({
      where: {
        id: params.bookId,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    if (!params.bookId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: {
        id: params.bookId,
      },
      include: {
        images: true,
        category: true,
        author: true,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
