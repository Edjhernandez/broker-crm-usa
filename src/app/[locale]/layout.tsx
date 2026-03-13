import type { Metadata } from "next";
import "../../app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "BrokerCRM",
  description:
    "platform for customer management and administration, designed to streamline operations and enhance client relationships for insurance brokers.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  if (!hasLocale(routing.locales, locale)) return notFound();

  return (
    <html suppressHydrationWarning={true} lang={locale}>
      <body className="bg-background text-foreground transition-colors duration-300">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
