"use client";
import Header from "@/components/Header";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function BlogsPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />
        <Blog />
        <Footer />
      </div>
    </>
  );
}
