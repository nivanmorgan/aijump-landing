'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Zap } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-black">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            {/* Content */}
            <div className="relative container mx-auto px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-sm font-medium text-blue-300">AiJump 2.0 is live</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
                        <span className="text-white">DevOps at</span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Light Speed
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    The military-grade Infrastructure-as-Code assistant that turns your requirements into production-ready deployment stacks.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="https://marketplace.visualstudio.com/items?itemName=purfectlabs.aijump-extension"
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-all"
                    >
                        <Terminal className="w-5 h-5" />
                        Install Extension
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        View Live Demo
                    </button>
                </motion.div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
        </div>
    );
}
