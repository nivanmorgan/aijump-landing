'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

const competitors = [
    {
        name: "GitHub Copilot",
        features: {
            context: "File/Snippet",
            infra: "General Purpose",
            deploy: "Chat Hints",
            security: "Basic",
        }
    },
    {
        name: "HashiCorp Extension",
        features: {
            context: "Language Server",
            infra: "Terraform Only",
            deploy: "None",
            security: "Syntax Only",
        }
    },
    {
        name: "AiJump",
        isFocal: true,
        features: {
            context: "Memory-Resident (Full Repo)",
            infra: "Multi-Cloud / K8s / Docker",
            deploy: "MonoGenesis™ Script",
            security: "Military-Grade / Active Scan",
        }
    }
];

const metrics = [
    { label: "Context Awareness", key: "context" },
    { label: "Infrastructure Specialization", key: "infra" },
    { label: "Deployment Output", key: "deploy" },
    { label: "Security & Validation", key: "security" },
];

export default function Comparison() {
    return (
        <section className="py-24 bg-neutral-950 border-t border-neutral-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Why We're <span className="text-blue-500">Different</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        General purpose AI tools guess. AiJump knows. We built the only memory-resident DevOps agent designed for mission-critical infrastructure.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto overflow-x-auto">
                    <div className="min-w-[800px] grid grid-cols-4 gap-4">
                        {/* Headers */}
                        <div className="col-span-1 p-6 flex items-end pb-8">
                            <span className="text-sm font-mono text-gray-500 uppercase tracking-wider">Feature Spec</span>
                        </div>
                        {competitors.map((comp, i) => (
                            <div key={i} className={`col-span-1 p-6 rounded-t-2xl flex flex-col justify-end ${comp.isFocal ? 'bg-blue-900/10 border-t border-x border-blue-500/30' : ''}`}>
                                <h3 className={`font-bold text-lg mb-1 ${comp.isFocal ? 'text-blue-400' : 'text-gray-400'}`}>
                                    {comp.name}
                                </h3>
                                {comp.isFocal && <div className="text-xs text-blue-300 font-mono">EST. 2026</div>}
                            </div>
                        ))}

                        {/* Rows */}
                        {metrics.map((metric, i) => (
                            <div key={i} className="contents group">
                                <div className="col-span-1 p-6 border-b border-neutral-800 flex items-center bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors">
                                    <span className="font-medium text-gray-300">{metric.label}</span>
                                </div>
                                {competitors.map((comp, j) => (
                                    <div
                                        key={j}
                                        className={cn(
                                            "col-span-1 p-6 border-b flex items-center transition-colors",
                                            comp.isFocal
                                                ? "bg-blue-900/10 border-blue-500/30 text-white font-medium shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]"
                                                : "bg-neutral-950 border-neutral-800 text-gray-500"
                                        )}
                                    >
                                        <span className="text-sm">{comp.features[metric.key as keyof typeof comp.features]}</span>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Footer/Summary Row within grid equivalent */}
                        <div className="contents">
                            <div className="col-span-1 p-6"></div>
                            <div className="col-span-1 p-6"></div>
                            <div className="col-span-1 p-6"></div>
                            <div className="col-span-1 p-6 rounded-b-2xl bg-blue-900/10 border-b border-x border-blue-500/30 text-center">
                                <span className="text-xs font-mono text-blue-400">RECOMMENDED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
