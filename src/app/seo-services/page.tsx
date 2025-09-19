import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrokenLinkDetector from "@/components/BrokenLinkDetector";

export default function SEOServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1">
        <BrokenLinkDetector />
      </div>
      <Footer />
    </div>
  );
}
