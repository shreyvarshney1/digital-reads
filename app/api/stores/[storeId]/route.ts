import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
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
      return new NextResponse('StoreId is required', { status: 400 });
    }

    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const role = session?.user?.role;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse('StoreId is required', { status: 400 });
    }

    const store = await prisma.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
