import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } },
) => {
  try {
    const productId = params.productId;
    if (!productId) {
      return new NextResponse('Product id is required!', { status: 400 });
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
      images,
    } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse('Size id is required', { status: 400 });
    }
    if (!colorId) {
      return new NextResponse('Color id is required', { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse('Images is required', { status: 400 });
    }

    const storeId = params.storeId;
    if (!storeId) {
      return new NextResponse('Store id is required!', { status: 400 });
    }

    const productId = params.productId;
    if (!productId) {
      return new NextResponse('Product id is required!', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorizes', { status: 403 });
    }

    await db.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        storeId,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await db.product.update({
      where: { id: productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
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

    const productId = params.productId;
    if (!productId) {
      return new NextResponse('Product id is required!', { status: 400 });
    }
    //validate user can't modified another user product
    const storeByUserId = await db.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorizes', { status: 403 });
    }

    const product = await db.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);

    return new NextResponse('Internal error!', { status: 500 });
  }
};
