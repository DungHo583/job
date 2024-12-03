import type { Metadata } from "next";
import "@/public/globals.css";
import { NextAuthProvider } from "@/components/nextauth-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "App",
  description: "App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ overflowX: "hidden" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          <NextAuthProvider>{children}</NextAuthProvider>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
