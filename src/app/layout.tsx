import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { SolanaProvider } from "@/providers/solana-provider";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Deprobo",
  description: "A Decentralized Betting Platform",
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "icon/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${lexend.className} antialiased`}>
        <ReactQueryProvider>
          <SolanaProvider>{children}</SolanaProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
