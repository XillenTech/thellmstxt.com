import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SEOAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
