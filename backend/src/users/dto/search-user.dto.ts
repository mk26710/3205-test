import { z } from "zod";

export const SearchUserSchema = z.object({
  email: z.string().email(),
  number: z.string().length(6).regex(/\d{6}/g, "Number must contain 6 digits!").nullish(),
});

export type SearchUserDto = z.infer<typeof SearchUserSchema>;
