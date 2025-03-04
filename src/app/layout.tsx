import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/Providers/theme-provider";
import AppFooter from "./_components/Footer/Footer";
import Navbar from "./_components/Navbar/Navbar";
import { LayoutProvider } from "@/Providers/LayoutProvider";
const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real Eye",
  description: "Detect Deepfakes Instantly with Real Eye.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>{children}</LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
