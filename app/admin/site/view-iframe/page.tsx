import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ViewIframePage } from "./iframe-page";
export default async function AccountsPage() {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/admin/login");
  }

  return <ViewIframePage userId={session.userId} role={session.role} />;
}
