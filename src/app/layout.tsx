import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, site } from "@/lib/site";
import { themeBootScript } from "@/lib/theme";
import "./globals.css";
import "./navbar.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${site.name} | Crafted apps`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
  },
  icons: {
    icon: [{ url: "/ks-logo.png", type: "image/png" }],
    apple: "/ks-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript() }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} min-h-dvh font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <main className="flex-1 pt-[var(--site-nav-pad)]">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
