import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export const GET = async (
  req: Request,
  { params }: { params: { billboardId: string } },
) => {
  try {
    const billboardId = params.billboardId;
    if (!billboardId) {
      return new NextResponse('Billboard id is required!', { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
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

    const billboardId = params.billboardId;
    if (!billboardId) {
      return new NextResponse('Billboard id is required!', { status: 400 });
    }
    //validate user can't modified another user billboard
    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorizes', { status: 403 });
    }

    const billboard = await db.billboard.update({
      where: { id: billboardId },
      data: { label, image },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
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

    const billboardId = params.billboardId;
    if (!billboardId) {
      return new NextResponse('Billboard id is required!', { status: 400 });
    }
    //validate user can't modified another user billboard
    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorizes', { status: 403 });
    }

    const billboard = await db.billboard.delete({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};
