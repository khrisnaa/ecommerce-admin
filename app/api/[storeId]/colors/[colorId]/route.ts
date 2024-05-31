import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export const GET = async (
  req: Request,
  { params }: { params: { colorId: string } },
) => {
  try {
    const colorId = params.colorId;
    if (!colorId) {
      return new NextResponse('Color id is required!', { status: 400 });
    }

    const color = await db.color.findUnique({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
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

    const colorId = params.colorId;
    if (!colorId) {
      return new NextResponse('Color id is required!', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await db.color.update({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
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

    const colorId = params.colorId;
    if (!colorId) {
      return new NextResponse('Color id is required!', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await db.color.delete({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};
