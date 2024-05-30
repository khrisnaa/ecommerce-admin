import { db } from '@/lib/db';

export const currentStore = async (storeId: string, userId: string) => {
  try {
    const store = await db.store.findFirst({ where: { id: storeId, userId } });
    return store;
  } catch (error) {
    return null;
  }
};
