import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
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

    //validate user can't modified another user billboard
    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await db.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_POST]', error);

    return new NextResponse('Internal error', { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } },
) => {
  try {
    const storeId = params.storeId;
    if (!storeId) {
      return new NextResponse('Store id is required!', { status: 400 });
    }

    const sizes = await db.size.findMany({ where: { storeId } });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log('[SIZES_GET]', error);

    return new NextResponse('Internal error', { status: 500 });
  }
};
