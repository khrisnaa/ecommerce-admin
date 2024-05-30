import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    //check user already login and for identify who create the store
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_POST]', error);

    return new NextResponse('Internal error', { status: 500 });
  }
};
