import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What is llms.txt? Complete Guide & Free Generator – TheLLMsTxt",
  alternates: {
    canonical: "https://thellmstxt.com/what-is-llms-txt",
  },
};

export default function WhatIsLLMsLayout({
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
