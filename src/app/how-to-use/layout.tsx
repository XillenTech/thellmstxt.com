import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How to Use llms.txt Generator & Integration Guide – TheLLMsTxt",
  description:
    "Learn how to use our free llms.txt generator step-by-step. Complete guide for creating and implementing llms.txt files.",
  keywords:
    "how to use llms.txt, llms.txt tutorial, llms.txt guide, llms.txt implementation, AI crawler control, website optimization tutorial",
  alternates: {
    canonical: "https://thellmstxt.com/how-to-use",
  },
};

export default function HowToUseLayout({
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
