"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TabbedGenerator from "@/components/TabbedGenerator";
import EcommerceUpsell from "@/components/EcommerceUpsell";
import WhatIsLLMsTxt from "@/components/WhatIsLLMsTxt";
import HowToUse from "@/components/HowToUse";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import WhyUseLLMsTxt from "@/components/WhyUseLLMsTxt";
import GeneratedFileFormats from "@/components/GeneratedFileFormats";

export default function HomeClient() {
  const handleCookieAccept = () => {
    console.log("Cookies accepted");
    // You can add analytics tracking here
  };

  const handleCookieReject = () => {
    console.log("Cookies rejected");
    // You can disable analytics tracking here
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1">
          <Hero />
          <TabbedGenerator />
          <EcommerceUpsell />
          <WhatIsLLMsTxt />
          <WhyUseLLMsTxt />
          <GeneratedFileFormats />
          <HowToUse />
          <FAQ />
        </div>
        <Footer />

        {/* Cookie Consent */}
        <CookieConsent
          onAccept={handleCookieAccept}
          onReject={handleCookieReject}
        />
      </div>
    </>
  );
}
