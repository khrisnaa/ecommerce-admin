'use server';

import { db } from '@/lib/db';
import { storeSchema } from '@/schemas';
import { storeSchemaType } from '@/schemas/definition';
import { auth } from '@clerk/nextjs/server';

export const newStore = async (values: storeSchemaType) => {
  const validateFields = storeSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name } = validateFields.data;
  if (!name) {
    return { error: 'Name is required!' };
  }

  const { userId } = auth();
  if (!userId) {
    return { error: 'Unauthorized!' };
  }

  await db.store.create({
    data: {
      name,
      userId,
    },
  });

  return { success: 'Store created!' };
};
