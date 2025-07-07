"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Generator from "@/components/Generator";
import EcommerceUpsell from "@/components/EcommerceUpsell";
import WhatIsLLMsTxt from "@/components/WhatIsLLMsTxt";
import HowToUse from "@/components/HowToUse";
// import WhyItMatters from "@/components/WhyItMatters";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

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
