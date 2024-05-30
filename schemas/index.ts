import { z } from 'zod';

export const storeSchema = z.object({
  name: z.string().min(1, {
    message: 'Store name must contain at least 1 character(s)',
  }),
});

export type storeSchemaType = z.infer<typeof storeSchema>;

export const billboardSchema = z.object({
  label: z.string().min(1, {
    message: 'Billboard label must contain at least 1 character(s)',
  }),
  image: z.string().min(1, {
    message: 'Billboard image url must contain at least 1 character(s)',
  }),
});
export type billboardSchemaType = z.infer<typeof billboardSchema>;
