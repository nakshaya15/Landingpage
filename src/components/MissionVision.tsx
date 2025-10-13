// src/components/VisionMission.tsx
import React from 'react';
import { Target, Zap } from 'lucide-react'; 

interface VmCardProps {
    icon: React.ReactNode;
    title: string;
    content: string;
    cardColor: string; // Dynamic color: e.g., 'purple', 'pink'
}

// Reusable animated Card Component for Vision/Mission
const VmCard: React.FC<VmCardProps> = ({ icon, title, content, cardColor }) => {
    
    // Dynamic classes based on the base color (e.g., 'purple' or 'pink')
    const borderColor = `border-${cardColor}-600`;
    const iconColor = `text-${cardColor}-600`;
    const shadowHover = `hover:shadow-${cardColor}-300/60`; // Lighter shadow for white card
    const titleColor = `text-gray-800`;
    
    return (
        <div 
            className={`
                // Base: White card, transparent background
                bg-white p-8 rounded-2xl shadow-xl 
                
                // Border/Depth effect
                border-b-4 ${borderColor} 
                
                // Animation & Shadow
                transition-all duration-500 transform 
                hover:scale-[1.05] 
                ${shadowHover}
                relative overflow-hidden 
                h-full cursor-default
            `}
        >
            
            {/* Icon */}
            <div className={`p-4 rounded-full bg-white ${iconColor} inline-block mb-6 shadow-md`}>
                {icon}
            </div>

            {/* Title */}
            <h3 className={`text-4xl font-extrabold ${titleColor} mb-4 tracking-tight`}>{title}</h3>
            
            {/* Content */}
            <p className="text-lg text-gray-600 leading-relaxed font-normal">{content}</p>
            
        </div>
    );
};

const VisionMission: React.FC = () => {
    return (
        // FIX 1: Set background to transparent to merge with previous sections and show video
        <div className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent"> 
            <div className="max-w-6xl mx-auto">
                
                {/* Section Header - Must be light color for video contrast */}
                <h2 className="text-5xl font-black text-white text-center mb-4 tracking-tighter">
                    Our <span className="text-pink-500">Purpose</span>
                </h2>
                <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
                    Driving innovation and human potential through focused, transformative technology education.
                </p>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-12">
                    
                    {/* Vision Card */}
                    <VmCard
                        icon={<Target size={40} strokeWidth={2.5} />}
                        title="Our Vision"
                        content="To create a new generation of tech professionals who don’t just chase jobs but create opportunities, solve real-world problems, and drive innovation that impacts humanity."
                        cardColor="purple"
                    />
                    
                    {/* Mission Card */}
                    <VmCard
                        icon={<Zap size={40} strokeWidth={2.5} />}
                        title="Our Mission"
                        content="To train, mentor, and transform students into self-driven innovators — professionals who can leverage technology to turn ideas into reality, challenges into opportunities, and learning into lifelong success."
                        cardColor="pink"
                    />
                    
                </div>

                {/* Concluding Statement (Strong CTA) - Using a dark background here for contrast on the CTA*/}
                <div className="mt-20 text-center p-8 bg-indigo-700 rounded-xl shadow-2xl">
                    <p className="text-3xl font-extrabold text-white">
                        Join us and define your future.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VisionMission;