import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().email(),
  number: z.string().regex(/\d{6}/g, "Number must contain 6 digits!").nullish(),
});
