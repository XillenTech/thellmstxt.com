import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Help with llms.txt Generator | TheLLMsTxt",
  description: "Get in touch with our team for support, feedback, or questions about our free llms.txt generator tool. We're here to help you control AI crawlers effectively.",
  keywords: "contact, support, llms.txt help, AI crawler control, customer service, feedback",
  alternates: {
    canonical: "https://thellmstxt.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
