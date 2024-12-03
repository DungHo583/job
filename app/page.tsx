import { redirect } from "next/navigation";

export default async function Index() {
  return redirect("/admin/site/dashboard");
}
