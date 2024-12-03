import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AccoutsPage } from "./account-page";
export default async function AccountsPage() {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/admin/login");
  }

  return <AccoutsPage userId={session.userId} role={session.role} />;
}
