import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy – TheLLMsTxt",
  alternates: {
    canonical: "https://thellmstxt.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-neutral-50 min-h-screen py-12 flex items-center justify-center">
        <div className="bg-white/95 rounded-3xl shadow-lg max-w-5xl w-full px-8 py-12 mx-4 border border-neutral-200">
          <h1 className="text-4xl text-gray-900 font-bold mb-8 text-center">
            Privacy Policy
          </h1>
          <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
            <p>
              This Privacy Policy describes how LLMsTxt (&quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects
              your personal information when you use our website
              (thellmstxt.com) and related services. By using our site, you
              agree to the practices described in this policy.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="info" className="text-2xl font-bold mt-12 mb-4">
              Information We Collect
            </h2>
            <ul>
              <li>
                Information about your use of our site, including details of
                your visits such as pages viewed and resources accessed (traffic
                data, location data, and other communication data).
              </li>
              <li>
                Information you provide voluntarily, for example, when you
                register for updates or contact us.
              </li>
              <li>
                Information you provide when you communicate with us by any
                means.
              </li>
            </ul>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="payment" className="text-2xl font-bold mt-12 mb-4">
              Payment Information
            </h2>
            <p>
              <strong>Note:</strong> We <u>do not</u> store any payment method
              details (such as your credit card or bank account information)
              while processing payments. All payment-related functions are
              handled securely by third-party providers.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="cookies" className="text-2xl font-bold mt-12 mb-4">
              Use of Cookies
            </h2>
            <p>
              We use cookies to gather information about your computer to help
              us improve our website. Cookies may collect statistical data about
              your browsing actions and patterns, but do not identify you
              personally. You can adjust your browser settings to decline
              cookies if you wish.
            </p>
            <p>
              Our advertisers or analytics partners may also use cookies, over
              which we have no control. Such cookies would be downloaded once
              you click on advertisements or interact with third-party content
              on our website.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="use" className="text-2xl font-bold mt-12 mb-4">
              How We Use Your Information
            </h2>
            <ul>
              <li>To provide information or services you request from us.</li>
              <li>
                To provide information about other products or features that may
                interest you (with your consent).
              </li>
              <li>
                To inform you of changes to our website, services, or products.
              </li>
              <li>To analyze usage and improve our website and services.</li>
            </ul>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="storage" className="text-2xl font-bold mt-12 mb-4">
              Storing and Transferring Your Data
            </h2>
            <p>
              Your data may be transferred to and stored in locations outside
              your country (including outside the United States) for processing.
              By providing your personal data, you agree to this transfer,
              storing, or processing. We take reasonable steps to ensure your
              data is treated securely.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="security" className="text-2xl font-bold mt-12 mb-4">
              Data Security
            </h2>
            <p>
              We do our utmost to protect your personal data. However,
              transmitting information over the internet is not completely
              secure, and such information can occasionally be intercepted.
              Sending information is at your own risk.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="disclosure" className="text-2xl font-bold mt-12 mb-4">
              Disclosing Your Information
            </h2>
            <ul>
              <li>
                We will not disclose your personal information except as
                described in this policy.
              </li>
              <li>
                We may disclose your information:
                <ul>
                  <li>If we sell any or all of our business to a buyer.</li>
                  <li>Where required by law.</li>
                  <li>
                    To further fraud protection and reduce the risk of fraud.
                  </li>
                </ul>
              </li>
            </ul>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="aggregation" className="text-2xl font-bold mt-12 mb-4">
              Data Sharing and Aggregation
            </h2>
            <p>
              We do not sell, trade, or rent your personal identification
              information to others. We may share generic aggregated demographic
              information not linked to any personal identification information
              with business partners, trusted affiliates, and advertisers for
              the purposes outlined above.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="thirdparty" className="text-2xl font-bold mt-12 mb-4">
              Third-Party Links / Websites
            </h2>
            <p>
              Our website may include links to third-party sites. We do not
              endorse or approve their privacy policies. Please review their
              privacy policy before providing any personal data.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="updates" className="text-2xl font-bold mt-12 mb-4">
              Policy Updates
            </h2>
            <p>
              We may update this Privacy Policy at any time. Please check this
              page regularly to stay informed about how we protect your
              information. Your continued use of the site after changes are
              posted will be deemed your acceptance of those changes.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="acceptance" className="text-2xl font-bold mt-12 mb-4">
              Your Acceptance
            </h2>
            <p>
              By using this site, you signify your acceptance of this policy. If
              you do not agree, please do not use our site.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="deletion" className="text-2xl font-bold mt-12 mb-4">
              Data Deletion
            </h2>
            <p>
              Accounts on this site can be anonymized or deleted at your
              request. Contact us at{" "}
              <a href="mailto:hello@thellmstxt.com">hello@thellmstxt.com</a> for
              details.
            </p>
            {/* <hr className="my-8 border-neutral-200" /> */}
            <h2 id="contact" className="text-2xl font-bold mt-12 mb-4">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a href="mailto:hello@thellmstxt.com">hello@thellmstxt.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
