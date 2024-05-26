import { z } from "zod";

import { formSchema } from "@/schemas";

export type formSchemaType = z.infer<typeof formSchema>;
