import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy – TheLLMsTxt",
  description:
    "Learn about our privacy policy and how we protect your data when using TheLLMsTxt free llms.txt generator.",
  keywords:
    "privacy policy, data protection, user privacy, GDPR compliance, cookie policy, personal data",
  alternates: {
    canonical: "https://thellmstxt.com/privacy",
  },
};

export default function PrivacyLayout({
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
