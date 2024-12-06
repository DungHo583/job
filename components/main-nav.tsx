"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNav({ roleUser }: { roleUser: string }) {
  const pathname = usePathname();

  const components: { title: string; href: string; role: string }[] = [
    {
      title: "Dashboard",
      href: "/admin/site/dashboard",
      role: "all",
    },
    {
      title: "Tài khoản",
      href: "/admin/site/account",
      role: "root",
    },
    {
      title: "Theo dõi",
      href: "/admin/site/monitor",
      role: "all",
    },
    {
      title: "Iframe",
      href: "/admin/site/view-iframe",
      role: "all",
    },
  ];

  return (
    <div className="h-full">
      <div className="h-[80px] py-5 pl-5 text-white font-bold">LOGO</div>
      <div className="px-3 pb-3" style={{ height: "calc(100% - 80px)" }}>
        <div className="w-full flex-wrap h-full">
          <div className="h-1/2">
            <Link className="w-full" href={"/admin/site/dashboard"}>
              <div
                className={
                  "inline-flex items-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-9 px-3 w-full justify-start mb-2 " +
                  (pathname.includes("dashboard")
                    ? "bg-muted text-muted-foreground"
                    : "bg-transparent text-white dark:text-black")
                }
              >
                Dashboard
              </div>
            </Link>
            <Link className="w-full" href={"/admin/site/account"}>
              <div
                className={
                  "inline-flex items-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-9 px-3 w-full justify-start mb-2 " +
                  (pathname.includes("account")
                    ? "bg-muted text-muted-foreground"
                    : "bg-transparent text-white dark:text-black")
                }
              >
                Tài khoản
              </div>
            </Link>
          </div>

          <div className="pt-4 border-t-2	border-white h-1/2">
            <Link className="w-full" href={"/admin/site/monitor"}>
              <div
                className={
                  "inline-flex items-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-9 px-3 w-full justify-start mb-2 " +
                  (pathname.includes("monitor")
                    ? "bg-muted text-muted-foreground"
                    : "bg-transparent text-white dark:text-black")
                }
              >
                Theo dõi
              </div>
            </Link>
            <Link className="w-full" href={"/admin/site/view-iframe"}>
              <div
                className={
                  "inline-flex items-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-9 px-3 w-full justify-start mb-2 " +
                  (pathname.includes("view-iframe")
                    ? "bg-muted text-muted-foreground"
                    : "bg-transparent text-white dark:text-black")
                }
              >
                Iframe
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
