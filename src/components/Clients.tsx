// src/components/Clients.tsx
import React from 'react';
import { Award, Zap } from 'lucide-react';

// Define the full list of clients with their logo placeholders and light theme accents
const clients = [
    { id: 1, name: "PlayAll", accentColor: "text-green-600", industry: "Sports & Fitness", icon: "🏀" },
    { id: 2, name: "KLITE", accentColor: "text-yellow-600", industry: "Lighting Solutions", icon: "💡" },
    { id: 3, name: "Akshaya Creative Ads (ACA)", accentColor: "text-pink-600", industry: "Creative Media", icon: "🎬" },
    { id: 4, name: "TechNova Solutions", accentColor: "text-indigo-600", industry: "IT Consultancy", icon: "💻" },
    { id: 5, name: "FutureBank PLC", accentColor: "text-purple-600", industry: "Fintech", icon: "🏦" },
    { id: 6, name: "GreenHarvest Co.", accentColor: "text-lime-600", industry: "AgriTech", icon: "🌱" },
];

const Clients: React.FC = () => {
    return (
        // FIX 1: Change bg-gray-100 to bg-transparent to allow the video to show
        <div className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent" id="clients">
            <div className="max-w-6xl mx-auto">
                
                {/* FIX 2: Change header text color to white for contrast against the video */}
                <h2 className="text-5xl font-extrabold text-white text-center mb-4 tracking-tight">
                    Our Valued <span className="text-pink-600">Partners</span>
                </h2>
                {/* FIX 3: Change paragraph text color to light gray for contrast against the video */}
                <p className="text-xl font-light text-gray-300 text-center mb-16 max-w-2xl mx-auto">
                    We empower visionary companies across diverse sectors to achieve success.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {clients.map(client => (
                        <div 
                            key={client.id}
                            className="group relative h-36 flex flex-col items-center justify-center p-4 
                                            bg-white rounded-xl shadow-lg border border-gray-200 
                                            overflow-hidden cursor-pointer"
                        >
                            {/* Base Layer: Name and Logo (Light Theme) */}
                            <div className="flex flex-col items-center justify-center h-full w-full 
                                                transition duration-500 group-hover:opacity-0 group-hover:scale-90">
                                {/* Large Icon/Logo Placeholder */}
                                <span className={`text-5xl ${client.accentColor}`}>{client.icon}</span>
                                <h3 className="text-sm font-semibold text-gray-700 mt-2">{client.name}</h3>
                            </div>

                            {/* Impressive Hover Layer: Gradient & Details (Unchanged) */}
                            <div className={`absolute inset-0 flex flex-col items-center justify-center p-3 text-center 
                                                bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl 
                                                opacity-0 scale-75 transition duration-500 group-hover:opacity-100 group-hover:scale-100`}>
                                
                                <Zap size={20} className="text-yellow-300 mb-1" />
                                <p className="text-xs font-bold text-white uppercase">{client.industry}</p>
                                <p className="text-xs text-indigo-200 mt-1">View Case Study &rarr;</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <button className="px-8 py-3 text-lg font-semibold rounded-full bg-pink-500 text-white shadow-lg 
                                            hover:bg-pink-600 transition duration-300 transform hover:scale-105">
                        <Award size={20} className="inline-block mr-2" />
                        See All Success Stories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Clients;