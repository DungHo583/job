import MainHeader from "@/components/main-header";
import MainNav from "@/components/main-nav";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/admin/login");
  }

  return (
    <main className="h-dvh w-full  text-black dark:text-white">
      <div className="flex">
        <div className="min-h-dvh dark:bg-white bg-slate-900 min-w-[210px] max-w-[210px] overflow-hidden ">
          <MainNav roleUser={session.role} />
        </div>
        <div className="w-full min-h-dvh bg-white dark:bg-black">
          <div className="w-full h-full flex flex-wrap">
            <div className="w-full max-h-[64px] min-h-[64px] px-3">
              <MainHeader name={session.name} />
            </div>
            <div
              style={{ height: "calc(100% - 70px)" }}
              className="w-full p-3 bg-gray-100 overflow-y-auto"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
