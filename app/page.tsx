'use client';

import Hero from './components/Hero';
import StatsGraph from './components/StatsGraph';
import FeatureGrid from './components/FeatureGrid';
import CodeDemo from './components/CodeDemo';
import Pricing from './components/Pricing';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Hero />
      <StatsGraph />
      {/* Bento Grid Features */}
      <FeatureGrid />
      <CodeDemo />
      <Pricing />

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-900 bg-black text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PurfectLabs. All rights reserved.</p>
        <p className="mt-2">Built for the future of DevOps.</p>
      </footer>
    </main>
  );
}
