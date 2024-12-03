import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MonitorPage } from "./monitor-page";
export default async function AccountsPage() {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/admin/login");
  }

  return <MonitorPage userId={session.userId} role={session.role} />;
}
