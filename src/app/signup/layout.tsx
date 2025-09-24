import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Create Your llms.txt Account | TheLLMsTxt",
  description: "Sign up for free access to our llms.txt generator tool. Create your account with a magic link and start controlling AI crawlers on your website today.",
  keywords: "sign up, account, llms.txt generator, magic link, AI crawler control, free account",
  alternates: {
    canonical: "https://thellmstxt.com/signup",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
