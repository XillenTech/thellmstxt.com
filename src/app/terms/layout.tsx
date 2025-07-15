import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions – Free llms.txt Generator",
  description:
    "Read our terms and conditions for using TheLLMsTxt free llms.txt generator and related services.",
  keywords: [
    "terms and conditions",
    "llms.txt terms",
    "service terms",
    "user agreement",
    "legal terms",
    "website terms",
  ],
  alternates: {
    canonical: "https://thellmstxt.com/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
