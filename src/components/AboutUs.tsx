// src/components/AboutUs.tsx
import React from 'react';
import { Briefcase, Zap, Heart } from 'lucide-react'; 

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    content: string;
    accentColor: string; // New prop for dynamic color
}

// Reusable animated Card Component (Highly Enhanced)
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, content, accentColor }) => {
    
    // Dynamic classes for deeper integration
    const borderColor = `border-${accentColor}-500`;
    const iconColor = `text-${accentColor}-500`;
    const shadowHover = `hover:shadow-${accentColor}-400/70`;
    const ringColor = `ring-${accentColor}-300`;
    
    return (
        <div 
            className={`
                // Base: White card, smooth corners, depth
                bg-white p-8 rounded-2xl shadow-xl transition-all duration-500 
                
                // Animated Border & Hover Effect
                border-b-4 ${borderColor} ring-2 ring-transparent 
                hover:scale-[1.05] 
                hover:shadow-3xl 
                ${shadowHover}
                hover:ring-4 ${ringColor}
                transform 
                cursor-pointer
                relative group
            `}
        >
            {/* Icon - With Background and Rotation on Hover */}
            <div className={`p-3 rounded-full bg-gray-100 ${iconColor} 
                            inline-block mb-4 shadow-md ring-4 ring-white
                            transition-all duration-500 group-hover:rotate-6 group-hover:bg-white`}>
                {icon}
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{title}</h3>
            
            {/* Content */}
            <p className="text-md text-gray-600 leading-relaxed font-normal">{content}</p>
        </div>
    );
};

const AboutUs: React.FC = () => {
    return (
        // FIX: Ensure main container is transparent to show the global video background
        <div className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent"> 
            <div className="max-w-6xl mx-auto">
                
                {/* Main Heading - High contrast against dark video background */}
                <h1 className="text-5xl font-black text-white text-center mb-4 tracking-tight">
                    Behind the <span className="text-pink-500">Monster</span>
                </h1>
                <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
                    Transforming students into industry-leading tech innovators since 2001.
                </p>

                {/* Introduction Section (Background is slightly darker/blurred to enhance text contrast) */}
                <div className="bg-purple-900 bg-opacity-70 backdrop-blur-sm p-10 rounded-2xl shadow-2xl mb-16 border-l-8 border-pink-500">
                    <p className="text-2xl text-white mb-4 leading-relaxed font-extrabold italic">
                        "We don't just teach technology — we build technologists."
                    </p>
                    <p className="text-lg text-gray-200 leading-relaxed font-light">
                        Founded with a powerful mission: to guide, mentor, and transform graduates into **confident, innovative, and industry-ready IT professionals**. Our focus is eliminating career missteps and empowering students with a strong sense of purpose to lead in today's digital era.
                    </p>
                </div>

                {/* Animated Feature Cards */}
                <div className="grid md:grid-cols-3 gap-10">
                    
                    {/* Card 1: Technical Transformation - Indigo Theme */}
                    <FeatureCard
                        icon={<Briefcase size={32} strokeWidth={2.5} />}
                        title="Technical Transformation"
                        content="Our students experience a complete transformation, becoming highly skilled full-stack professionals capable of building end-to-end applications in Java, Python, and AI/ML."
                        accentColor="indigo"
                    />
                    
                    {/* Card 2: Career Success - Green Theme */}
                    <FeatureCard
                        icon={<Zap size={32} strokeWidth={2.5} />}
                        title="Guaranteed Performance"
                        content="Our graduates don’t just get hired by MNCs (like Tech Mahindra, Wipro, Infosys) — they thrive on the job, add immediate value, and become key assets to their organizations."
                        accentColor="green"
                    />
                    
                    {/* Card 3: Mindset & Vision - Purple Theme */}
                    <FeatureCard
                        icon={<Heart size={32} strokeWidth={2.5} />}
                        title="The Growth Mindset"
                        content="We nurture resilience, optimism, and confidence. Real success comes when deep technical skill meets the right attitude, purpose, and vision for lifelong growth."
                        accentColor="purple"
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;