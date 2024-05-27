import { z } from 'zod';

import { storeSchema } from '@/schemas';

export type storeSchemaType = z.infer<typeof storeSchema>;
