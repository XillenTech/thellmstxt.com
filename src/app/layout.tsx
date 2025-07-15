import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free llms.txt Generator – Control AI Crawlers",
  description:
    "Create your llms.txt file in seconds with our free, smart builder. Block AI crawlers like ChatGPT and Gemini from accessing your content easily.",
  keywords: [
    "llms.txt generator",
    "what is llms.txt",
    "how to create llms.txt",
    "llms.txt vs robots.txt",
    "llms.txt format spec",
    "llms-full.txt vs llms.txt",
    "benefits of llms.txt",
    "llms.txt generator tool",
    "free llms.txt generator online",
    "best llms.txt generator",
    "llms.txt tool for Shopify",
    "llms.txt generator vs manual",
    "compare llms.txt tools",
    "llms.txt tools vs plugin",
    "how to use llms.txt for SEO",
    "automate llms.txt generation",
    "llms.txt for eCommerce site",
    "llms.txt integration guide",
    "llms.txt generator API",
    "hosts supporting llms.txt",
    "ai content crawlers",
    "robots.txt for LLMs",
    "llms.txt",
    "what is llms.txt",
    "LLMS.txt guide",
    "llms.txt example",
    "llms.txt for SEO",
    "llms.txt for eCommerce",
    "llms.txt for Shopify",
    "llms.txt for WordPress",
    "llms.txt for WooCommerce",
    "llms.txt for Magento",
    "llms.txt for BigCommerce",
    "how to create llms.txt",
    "llms.txt implementation tutorial",
    "llms.txt for AI content crawlers",
    "llms.txt for AI search engines",
    "llms.txt for AI assistants",
    "llms.txt for AI chatbots",
    "llms.txt for AI recommendation systems",
    "llms.txt for AI content discovery",
    "llms.txt for AI content optimization",
  ],
  alternates: {
    canonical: "https://thellmstxt.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2HX2DM66MP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2HX2DM66MP');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
