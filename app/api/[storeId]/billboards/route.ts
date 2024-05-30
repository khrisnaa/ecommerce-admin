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
    const { label, image } = body;

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }
    if (!image) {
      return new NextResponse('Image is required', { status: 400 });
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
      return new NextResponse('Unauthorizes', { status: 403 });
    }

    const billboard = await db.billboard.create({
      data: {
        label,
        image,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_POST]', error);

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

    const billboards = await db.billboard.findMany({ where: { storeId } });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error);

    return new NextResponse('Internal error', { status: 500 });
  }
};
