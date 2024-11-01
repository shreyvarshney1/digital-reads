import { auth } from '@/auth';
import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const role = session?.user?.role;
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
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

    const billboard = await prisma.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
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

    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
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

    const billboard = await prisma.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
