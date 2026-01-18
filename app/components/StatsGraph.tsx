'use client';

import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { name: 'Week 1', manual: 40, aijump: 40 },
    { name: 'Week 2', manual: 45, aijump: 55 },
    { name: 'Week 3', manual: 42, aijump: 75 },
    { name: 'Week 4', manual: 48, aijump: 85 },
    { name: 'Week 5', manual: 50, aijump: 95 },
    { name: 'Week 6', manual: 52, aijump: 120 },
    { name: 'Week 7', manual: 49, aijump: 140 },
];

export default function StatsGraph() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Accelerate Your Workflow
                    </h2>
                    <p className="text-gray-400 text-lg">
                        See the difference in deployment velocity with AiJump
                    </p>
                </div>

                <div className="max-w-5xl mx-auto h-[400px] bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorAiJump" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#666"
                                tick={{ fill: '#666' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#666"
                                tick={{ fill: '#666' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#000',
                                    border: '1px solid #333',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="manual"
                                stroke="#6b7280"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorManual)"
                                name="Manual Process"
                            />
                            <Area
                                type="monotone"
                                dataKey="aijump"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorAiJump)"
                                name="With AiJump"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
