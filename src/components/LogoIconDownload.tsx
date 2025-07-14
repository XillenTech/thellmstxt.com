import React, { useRef } from "react";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import * as htmlToImage from "html-to-image";

const iconSize = 64;

export default function LogoIconDownload() {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ref.current) return;
    const dataUrl = await htmlToImage.toPng(ref.current, {
      backgroundColor: "#1a2233",
    });
    const link = document.createElement("a");
    link.download = "llms-logo-icon.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={ref}
        className="inline-flex items-center justify-center bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 p-4 rounded-xl shadow-lg"
        style={{ width: iconSize, height: iconSize }}
      >
        <HiOutlineDocumentChartBar size={40} className="text-white" />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Download PNG
      </button>
    </div>
  );
}
