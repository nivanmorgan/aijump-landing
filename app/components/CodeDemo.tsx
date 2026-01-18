'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

const codeSteps = [
    { text: "aijump init", output: "Initializing project structure..." },
    { text: "aijump scan", output: "Found: Next.js + Tailwind + Supabase" },
    { text: "aijump generate k8s", output: "Generated: deployment.yaml, service.yaml" },
];

export default function CodeDemo() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % codeSteps.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-neutral-950">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            It feels like <span className="text-blue-500">magic</span>.
                            <br />
                            Because it is.
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            No more wrestling with YAML indentation or memorizing complex CLI flags.
                            Just tell AiJump what you need, or let it discover your stack automatically.
                        </p>
                        <div className="flex flex-col gap-4">
                            {codeSteps.map((step, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-xl transition-all duration-300 ${i === activeStep
                                            ? 'bg-blue-500/10 border-l-4 border-blue-500'
                                            : 'bg-transparent border-l-4 border-transparent'
                                        }`}
                                >
                                    <h3 className={`font-mono font-bold ${i === activeStep ? 'text-blue-400' : 'text-gray-500'}`}>
                                        $ {step.text}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1">{step.output}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terminal Window */}
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-800 shadow-2xl">
                            {/* Terminal Header */}
                            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-gray-800">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="ml-4 flex items-center gap-2 text-gray-400 text-sm font-mono">
                                    <Terminal size={14} />
                                    <span>bash — 80x24</span>
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 font-mono text-sm h-[400px] flex flex-col">
                                <div className="text-green-400 mb-4">Are you ready to jump? (y/n)</div>
                                {codeSteps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: i <= activeStep ? 1 : 0.3 }}
                                        className="mb-4"
                                    >
                                        <div className="flex gap-2 text-blue-400">
                                            <span>➜</span>
                                            <span>~</span>
                                            <span className="text-white">{step.text}</span>
                                        </div>
                                        {i <= activeStep && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="text-gray-400 mt-1 pl-4 border-l border-gray-700"
                                            >
                                                {step.output}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}

                                <motion.div
                                    className="flex gap-2 text-blue-400 mt-auto"
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                >
                                    <span className="w-2 h-4 bg-gray-500 block" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
