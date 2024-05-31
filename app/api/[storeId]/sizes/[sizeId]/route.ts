import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export const GET = async (
  req: Request,
  { params }: { params: { sizeId: string } },
) => {
  try {
    const sizeId = params.sizeId;
    if (!sizeId) {
      return new NextResponse('Size id is required!', { status: 400 });
    }

    const size = await db.size.findUnique({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    const body = await req.json();
    const { name, value } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    const storeId = params.storeId;
    if (!storeId) {
      return new NextResponse('Store id is required!', { status: 400 });
    }

    const sizeId = params.sizeId;
    if (!sizeId) {
      return new NextResponse('Size id is required!', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await db.size.update({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    const storeId = params.storeId;
    if (!storeId) {
      return new NextResponse('Store id is required!', { status: 400 });
    }

    const sizeId = params.sizeId;
    if (!sizeId) {
      return new NextResponse('Size id is required!', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await db.size.delete({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};
