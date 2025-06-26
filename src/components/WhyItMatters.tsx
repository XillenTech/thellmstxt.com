"use client";
import React from "react";
import { Target, TrendingUp, Shield, Zap } from "lucide-react";

const WhyItMatters = () => {
  const benefits = [
    {
      icon: Target,
      title: "Be the Recommendation",
      description:
        'When a user asks an AI, "Where can I find handmade leather boots?", your store can be the answer.',
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Increase Qualified Traffic",
      description:
        "Attract customers who have already expressed direct intent to buy, sending them straight to your product pages.",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Ensure Accurate Listings",
      description:
        "Guide AI to the correct product names, descriptions, and URLs, preventing errors that could lose a sale.",
      color: "text-green-600",
    },
    {
      icon: Zap,
      title: "Gain a Competitive Edge",
      description:
        "Get your products listed on emerging AI platforms before your competitors do.",
      color: "text-orange-600",
    },
  ];

  return (
    <section id="why-it-matters" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to the Future of Shopping:
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Conversational Commerce
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI assistants are changing how people discover and buy products.
            Make sure your store is ready.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-gray-50 ${benefit.color} mb-4 group-hover:scale-110 transition-transform`}
              >
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The AI Shopping Revolution is Here
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Consumers are increasingly using AI assistants to research and
              find products. Without proper optimization, your products might be
              invisible to this growing market.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>ChatGPT Shopping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Google Bard Commerce</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Claude Shopping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
