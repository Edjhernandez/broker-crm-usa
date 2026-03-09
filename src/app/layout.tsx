import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrokerCRM",
  description:
    "platform for customer management and administration, designed to streamline operations and enhance client relationships for insurance brokers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
