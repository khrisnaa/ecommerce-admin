import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Store name must contain at least 1 character(s)",
  }),
});
