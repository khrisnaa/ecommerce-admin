import { z } from 'zod';

export const storeSchema = z.object({
  name: z.string().min(1, {
    message: 'Store name must contain at least 1 character(s)',
  }),
});
