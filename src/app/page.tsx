import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Generator from "@/components/Generator";
import EcommerceUpsell from "@/components/EcommerceUpsell";
import WhatIsLLMsTxt from "@/components/WhatIsLLMsTxt";
import HowToUse from "@/components/HowToUse";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thellmstxt.com/",
  },
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Generator />
        <EcommerceUpsell />
        <WhatIsLLMsTxt />
        <HowToUse />
        {/* <WhyItMatters /> */}
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
