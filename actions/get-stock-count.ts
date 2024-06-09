import { db } from '@/lib/db';

export const getStockCount = async (storeId: string) => {
  const stokCount = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stokCount;
};
