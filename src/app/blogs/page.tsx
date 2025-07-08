import type { Metadata } from "next";
import Header from "@/components/Header";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blogs – TheLLMsTxt",
  alternates: {
    canonical: "https://thellmstxt.com/blogs/",
  },
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Blog />
      <Footer />
    </div>
  );
}
