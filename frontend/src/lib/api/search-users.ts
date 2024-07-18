import { UserEntrySchema } from "@/schemas/user-entry";

export const searchUsers = async (
  controller: AbortController,
  email: string,
  number?: string | null,
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const resp = await fetch("http://localhost:8080/users", {
    headers,
    method: "POST",
    body: JSON.stringify({ email, number }),
    signal: controller.signal,
  });

  const data = await resp.json();

  return UserEntrySchema.array().parse(data);
};
