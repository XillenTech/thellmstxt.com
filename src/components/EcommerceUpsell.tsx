'use client';
import React from 'react';
import { ShoppingCart, CheckCircle, ArrowRight, Zap } from 'lucide-react';

const EcommerceUpsell = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <ShoppingCart className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Running an eCommerce Store on 
              <span className="text-purple-600"> Shopify</span>, 
              <span className="text-blue-600"> WooCommerce</span>, or 
              <span className="text-green-600"> BigCommerce</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t manually guess your product paths. Get a solution built specifically for online stores.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Manual Setup Falls Short for eCommerce:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Don&apos;t manually guess your product paths</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Stop worrying about blocking the wrong pages</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Get a solution that updates automatically</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get the Pro eCommerce Solution:
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700">One-Click Platform Integration</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700">Automatic Path Discovery</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700">Optimized for Product Feeds</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700">Dedicated eCommerce Support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">Powered by llmstxt.store</span>
            </div>
            <a
              href="https://llmstxt.store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Automate Your eCommerce llms.txt</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <p className="text-sm text-gray-500 mt-3">
              Professional solution designed specifically for online stores
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcommerceUpsell;