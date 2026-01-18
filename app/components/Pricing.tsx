'use client';

import { Check } from 'lucide-react';

export default function Pricing() {
    return (
        <section className="py-24 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-white">Simple, transparent pricing</h2>
                    <p className="text-gray-400">Start for free, upgrade when you need power.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Starter */}
                    <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">$0</span>
                            <span className="text-gray-500">/mo</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Repo scanning & analysis",
                                "Basic command help",
                                "Read-only reports",
                                "Community support"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-gray-300">
                                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://marketplace.visualstudio.com/items?itemName=purfectlabs.aijump-extension"
                            className="block w-full text-center py-4 rounded-xl bg-neutral-800 text-white font-bold hover:bg-neutral-700 transition-colors"
                        >
                            Install Free
                        </a>
                    </div>

                    {/* Pro */}
                    <div className="relative p-8 rounded-3xl bg-gradient-to-b from-blue-900/20 to-neutral-900 border border-blue-500/50">
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                            POPULAR
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">$9.99</span>
                            <span className="text-gray-500">/mo</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Everything in Free",
                                "Unlimited generations",
                                "Multi-cloud deployment",
                                "Priority support",
                                "Advanced security scans"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-white">
                                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://marketplace.visualstudio.com/items?itemName=purfectlabs.aijump-extension"
                            className="block w-full text-center py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25"
                        >
                            Start 7-Day Trial
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
