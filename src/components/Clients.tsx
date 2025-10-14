import React from 'react';
import { Award, Zap } from 'lucide-react';

// Define the filtered list of clients.
const clients = [
    { id: 1, name: "PlayAll", accentColor: "text-green-600", industry: "Sports & Fitness", icon: "🏀" },
    { id: 2, name: "KLITE", accentColor: "text-yellow-600", industry: "Lighting Solutions", icon: "💡" },
    { id: 3, name: "Akshaya Creative Ads (ACA)", accentColor: "text-pink-600", industry: "Creative Media", icon: "🎬" },
];

const Clients: React.FC = () => {
    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent" id="clients">
            <div className="max-w-6xl mx-auto">
                
                {/* Section Header */}
                <h2 className="text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
                    Our Valued <span className="text-pink-600">Partners</span>
                </h2>
                <p className="text-xl font-light text-gray-300 text-center mb-16 max-w-2xl mx-auto">
                    We empower visionary companies across diverse sectors to achieve success.
                </p>

                {/* Client Grid (Adjusted for 3 items) */}
                {/* max-w-4xl mx-auto and lg:grid-cols-3 ensures the three cards are centered and impactful on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {clients.map(client => (
                        <div 
                            key={client.id}
                            className="group relative h-40 flex flex-col items-center justify-center p-4 
                                       bg-white rounded-xl shadow-lg border border-gray-200 
                                       overflow-hidden cursor-pointer
                                       transform hover:shadow-2xl hover:border-pink-500 transition duration-300"
                        >
                            {/* Base Layer: Name and Logo */}
                            <div className="flex flex-col items-center justify-center h-full w-full 
                                             transition duration-500 group-hover:opacity-0 group-hover:scale-90">
                                {/* Large Icon/Logo Placeholder */}
                                <span className={`text-6xl ${client.accentColor}`}>{client.icon}</span>
                                <h3 className="text-lg font-bold text-gray-800 mt-2">{client.name}</h3>
                                <p className="text-xs text-gray-500">{client.industry}</p>
                            </div>

                            {/* Impressive Hover Layer: Gradient & Details */}
                            <div className={`absolute inset-0 flex flex-col items-center justify-center p-3 text-center 
                                            bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl 
                                            opacity-0 scale-75 transition duration-500 
                                            group-hover:opacity-100 group-hover:scale-100`}>
                                
                                <Zap size={24} className="text-yellow-300 mb-1" />
                                <p className="text-sm font-bold text-white uppercase">{client.industry}</p>
                                <p className="text-sm text-indigo-200 mt-2 hover:text-white transition-colors">
                                    View Case Study &rarr;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* CTA Button */}
                <div className="text-center mt-16">
                    <button className="px-8 py-3 text-lg font-semibold rounded-full bg-pink-500 text-white shadow-xl shadow-pink-500/30
                                       hover:bg-pink-600 transition duration-300 transform hover:scale-105 hover:shadow-2xl">
                        <Award size={20} className="inline-block mr-2" />
                        See All Success Stories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Clients;
