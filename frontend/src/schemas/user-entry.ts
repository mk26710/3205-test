import { z } from "zod";

export const UserEntrySchema = z.object({
  email: z.string(),
  number: z.string(),
});

export type UserEntry = z.infer<typeof UserEntrySchema>;
