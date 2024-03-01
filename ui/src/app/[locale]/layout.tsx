import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "@/utils/query-client/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toaster from "@/components/shared/toaster/toaster";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carepatron Project",
  description: "Carepatron Project",
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  return (
    <html lang={locale}>
      <head>
        <title>Carepatron Project</title>
      </head>

      <body
        suppressHydrationWarning={true}
        className={twMerge(inter.className, "bg-neutral-100")}
      >
        <Providers>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
