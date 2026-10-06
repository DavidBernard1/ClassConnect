import { redirect } from "next/navigation";
import { getCurrentUser, isAdminUser } from "@/lib/auth";

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminUser(user)) redirect("/login");
  return user;
}
