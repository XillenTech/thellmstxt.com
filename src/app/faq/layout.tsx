import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ – TheLLMsTxt: Free llms.txt Generator & Integration Guide",
  alternates: {
    canonical: "https://thellmstxt.com/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
