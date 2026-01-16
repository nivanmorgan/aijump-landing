'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_aijump_pro', // Will be replaced with actual Stripe price ID
        }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">
            🚀 AiJump
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Military-Grade DevOps Assistant for VSCode
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Infrastructure-as-Code automation. Built for developers who work with Terraform, Docker, and Kubernetes.
          </p>
        </div>

        {/* Feature Comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Free Tier */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-4xl font-bold mb-6">$0</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>AiGo - Interactive help</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>AiLearn - Project scanning</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>AiShow - Structure display</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>AiWorks - Project listing</span>
              </li>
            </ul>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=aijump.aijump"
              className="block w-full text-center bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Install Free
            </a>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 border-2 border-blue-400 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-4xl font-bold mb-2">$7.99<span className="text-xl">/month</span></p>
            <p className="text-sm mb-6">7-day free trial included</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span className="font-semibold">All Free features</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏗️</span>
                <span><strong>AiBuild</strong> - Infrastructure scaffolding</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span><strong>AiBaseline</strong> - State reports</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📦</span>
                <span><strong>AiPublish</strong> - Deployment scripts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span><strong>AiSanity</strong> - Feature validation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎯</span>
                <span><strong>AiPossible</strong> - Feasibility analysis</span>
              </li>
            </ul>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Start Free Trial'}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful DevOps Automation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-2">Infrastructure Gen</h3>
              <p className="text-gray-400">
                Auto-generate Dockerfile, Terraform, and K8s configs tailored to your project
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">State Reports</h3>
              <p className="text-gray-400">
                Comprehensive baseline reports with git integration and file statistics
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">One-Click Deploy</h3>
              <p className="text-gray-400">
                MonoGenesis scripts package your entire project into a single deployable bash file
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Trusted by DevOps engineers and full-stack developers
          </p>
          <p className="text-sm text-gray-500">
            Cancel anytime • Secure payment via Stripe
          </p>
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
      `}</style>
    </div>
  );
}
