'use client';

import { motion } from 'framer-motion';
import { Box, Code2, Globe, Lock, Rocket, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
    {
        title: "Instant Infrastructure",
        description: "Generate Docker, Terraform, and K8s manifests in seconds.",
        icon: <Box className="w-8 h-8 text-blue-400" />,
        className: "md:col-span-2",
    },
    {
        title: "Smart Analysis",
        description: "Deep codebase understanding.",
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        className: "md:col-span-1",
    },
    {
        title: "Global Deploy",
        description: "One-click MonoGenesis deployment system.",
        icon: <Globe className="w-8 h-8 text-emerald-400" />,
        className: "md:col-span-1",
    },
    {
        title: "Security First",
        description: "Built-in vulnerability scanning and best practices.",
        icon: <Lock className="w-8 h-8 text-red-400" />,
        className: "md:col-span-2",
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-24 bg-black">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-8 hover:bg-neutral-800/50 transition-colors",
                                feature.className
                            )}
                        >
                            <div className="mb-4 relative z-10">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{feature.title}</h3>
                            <p className="text-gray-400 relative z-10">{feature.description}</p>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
