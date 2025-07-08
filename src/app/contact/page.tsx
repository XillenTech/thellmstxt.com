"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-tr from-sky-50 via-white to-indigo-50 flex items-center justify-center px-2 py-10">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Text + Title */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600">
              Got questions, feedback, or just want to say hi? We’re always
              happy to hear from you.
            </p>
          </div>

          {/* Right: Info Cards */}
          <div className="space-y-6">
            <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
              <h2 className="text-base font-semibold text-blue-700 mb-1">
                Email
              </h2>
              <p className="text-blue-600 text-sm break-all">
                hello@thellmstxt.com
              </p>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
              <h2 className="text-base font-semibold text-blue-700 mb-1">
                Address
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                123 AI Lane, Suite 42
                <br />
                Tech City, CA 90001
              </p>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-md hover:shadow-lg transition">
              <h2 className="text-base font-semibold text-blue-700 mb-1">
                Business Hours
              </h2>
              <p className="text-gray-700 text-sm">
                Monday – Friday: 9:00 AM to 6:00 PM{" "}
                <span className="text-gray-500 text-xs">(PST)</span>
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl text-yellow-900 text-sm shadow-sm">
              <p className="font-semibold mb-1">Need something urgent?</p>
              <p>
                Shoot us an email for the fastest response. We’ll be on it ⚡
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
