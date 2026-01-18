'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_aijump_pro',
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
    <div className="min-h-screen bg-black text-white">
      {/* Gradient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-24">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase border border-blue-400/30 px-4 py-2 rounded-full bg-blue-500/10">
              Military-Grade DevOps Automation
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              AiJump
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">
            Infrastructure-as-Code assistant for
            <span className="text-white font-semibold"> VSCode</span>
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Intelligent automation for Terraform, Docker, and Kubernetes. Stop writing boilerplate—let AI handle your infrastructure.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32">
          {/* Free Tier */}
          <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-700/50">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-2">Free</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">$0</span>
                <span className="text-gray-400 text-lg">/forever</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">AiGo</p>
                  <p className="text-sm text-gray-400">Interactive command help</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">AiLearn</p>
                  <p className="text-sm text-gray-400">Project structure scanning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">AiShow & AiWorks</p>
                  <p className="text-sm text-gray-400">View learned projects</p>
                </div>
              </div>
            </div>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=aijump.aijump-extension"
              className="block w-full text-center bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Install Free
            </a>
          </div>

          {/* Pro Tier */}
          <div className="group relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 border-2 border-blue-400 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02]">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              MOST POPULAR
            </div>
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-2">Pro</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">$7.99</span>
                <span className="text-blue-100 text-lg">/month</span>
              </div>
              <p className="text-blue-100 text-sm mt-2">7-day free trial • Cancel anytime</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Everything in Free, plus:</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">AiBuild</p>
                  <p className="text-sm text-blue-100">Generate infrastructure scaffolding</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">AiBaseline</p>
                  <p className="text-sm text-blue-100">Comprehensive state reports</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">AiPublish</p>
                  <p className="text-sm text-blue-100">MonoGenesis deployment scripts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">AiSanity & AiPossible</p>
                  <p className="text-sm text-blue-100">Validation & feasibility analysis</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-white text-blue-600 hover:bg-blue-50 px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
            >
              {loading ? 'Processing...' : 'Start 7-Day Free Trial'}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful DevOps Automation</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transform your infrastructure workflow with AI-powered commands
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              onMouseEnter={() => setHoveredFeature(0)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Infrastructure Generation</h3>
              <p className="text-gray-400 leading-relaxed">
                Auto-generate production-ready Dockerfile, Terraform configs, and Kubernetes manifests tailored to your stack
              </p>
            </div>

            <div 
              className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
              onMouseEnter={() => setHoveredFeature(1)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">State Reports</h3>
              <p className="text-gray-400 leading-relaxed">
                Comprehensive project baselines with git integration, file statistics, and dependency tracking
              </p>
            </div>

            <div 
              className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20"
              onMouseEnter={() => setHoveredFeature(2)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">MonoGenesis Deploy</h3>
              <p className="text-gray-400 leading-relaxed">
                Package your entire project into a single, executable bash deployment script
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-2">
            Trusted by DevOps engineers and full-stack developers
          </p>
          <p className="text-sm text-gray-500">
            Cancel anytime • Secure payment via Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
