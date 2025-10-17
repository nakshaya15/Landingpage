import React from 'react';
import { Award, Briefcase, Zap, Star, Anchor } from 'lucide-react';

// Reusable Achievement Block Component (No change needed here, it's flexible)
interface AchievementBlockProps {
    icon: React.ReactNode;
    title: string;
    content: React.ReactNode;
    colorClass: string; // Used for borders/text/hover
    gradientClass: string; // Used for the animated background color stops
}

const AchievementBlock: React.FC<AchievementBlockProps> = ({ icon, title, content, colorClass, gradientClass }) => {
    
    // Dynamic Tailwind classes for borders, text, and hover effects (using the main colorClass)
    const borderColor = `border-${colorClass}-700`; 
    const iconColor = `text-${colorClass}-700`; 
    const titleColor = `text-${colorClass}-900`; 
    const contentColor = `text-${colorClass}-800`; 
    const hoverShadow = `shadow-${colorClass}-500/60`; 
    const ringHover = `ring-${colorClass}-300`; 

    return (
        <div 
            className={`
                // **Multi-Color Gradient Shift Classes**
                bg-gradient-to-r ${gradientClass} p-6 rounded-xl shadow-lg 
                bg-300 animate-color-shift 
                
                // Animation & Hover: Smooth transition, lift, scale, and dynamic border
                transition-all duration-400 transform 
                border-l-4 border-transparent hover:${borderColor} 
                hover:scale-[1.03] hover:translate-y-[-2px] 
                hover:shadow-2xl hover:${hoverShadow} 
                
                // Layout
                flex flex-col space-y-3 h-full cursor-pointer relative group
            `}
        >
            <div className={`flex items-center space-x-3`}>
                {/* Icon Container: White background, animated ring/scale on hover */}
                <div className={`p-3 rounded-full bg-white ${iconColor} flex-shrink-0 
                                 ring-4 ring-white transition-all duration-300 
                                 group-hover:scale-105 group-hover:${ringHover} shadow-md`}>
                    {icon}
                </div>
                {/* Dynamic Title Color */}
                <h3 className={`text-xl font-extrabold ${titleColor}`}>{title}</h3>
            </div>
            
            {/* Dynamic Content Color */}
            <p className={`${contentColor} leading-relaxed text-md`}>{content}</p>
        </div>
    );
};

const FoundersProfile: React.FC = () => {
    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="max-w-6xl mx-auto">
                
                {/* Headers remain the same */}
                <h1 className="text-5xl font-black text-white text-center mb-4 tracking-tight">
                    The Authority & <span className="text-pink-500">Vision</span>
                </h1>
                <h2 className="text-4xl font-light text-indigo-300 text-center mb-12 border-b-4 border-pink-500 pb-3 inline-block mx-auto block">
                    Maqs — Founder, MonsterCoders
                </h2>

                {/* INTRODUCTION BLOCK remains the same */}
                <div className="mb-12 p-8 bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-xl shadow-2xl border-l-8 border-pink-500">
                    <div className="flex items-center mb-4">
                        <Star size={32} className="mr-4 text-yellow-400 flex-shrink-0 animate-pulse" />
                        <h3 className="text-3xl font-extrabold">The Maqs Difference</h3>
                    </div>
                    <p className="text-xl font-medium leading-relaxed italic">
                        The visionary dedicated to preventing career missteps and transforming aimless graduates into **focused, confident, and purpose-driven tech professionals**. He builds technologists, not just employees.
                    </p>
                </div>

                {/* ACHIEVEMENT GRID */}
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Card 1: Vibrant Pink/Fuchsia Theme */}
                    <AchievementBlock
                        icon={<Briefcase size={24} />}
                        title="Over a Decade of Leadership"
                        content={<>Built and led successful technology teams for global giants like <strong className="font-extrabold text-fuchsia-700">GE Power Systems, Ford Motors, TRW, and Caterpillar (USA)</strong>.</>}
                        colorClass="fuchsia" // Defines border, text, hover colors
                        gradientClass="from-pink-300 via-fuchsia-300 to-purple-300" // Defines shifting background colors
                    />
                    
                    {/* Card 2: Deep Teal Theme */}
                    <AchievementBlock
                        icon={<Award size={24} />}
                        title="Elite IIM & Corporate Foundation"
                        content={<>An alumnus of <strong className="font-extrabold text-teal-700">IIM Kozhikode</strong> and a former professional at **Tech Mahindra**, combining strategy with technical execution.</>}
                        colorClass="teal" // Defines border, text, hover colors
                        gradientClass="from-teal-300 via-sky-300 to-green-300" // Defines shifting background colors
                    />
                    
                    {/* Card 3: Warm Amber/Yellow Theme */}
                    <AchievementBlock
                        icon={<Zap size={24} />}
                        title="Entrepreneurship"
                        content={<>Founded a successful software venture in 2017, developed & deployed Inventory & ERP software Inventory  in partnership with KLite across Chennai businesses.</>}
                        colorClass="amber" // Defines border, text, hover colors
                        gradientClass="from-amber-300 via-yellow-300 to-orange-300" // Defines shifting background colors
                    />
                    
                    {/* Card 4: Static Block - Rich Indigo/Blue Theme (All cards now have the shifting background) */}
                    <div className="p-6 rounded-xl shadow-xl border-r-4 border-indigo-700 flex flex-col justify-center 
                                transition-all duration-300 hover:shadow-indigo-500/60 hover:scale-[1.03] hover:translate-y-[-2px] cursor-pointer
                                
                                // Animated Background for static card
                                bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 
                                bg-300 animate-color-shift"> 
                        <div className="flex items-center mb-3">
                            <Anchor size={28} className="mr-3 text-indigo-700" />
                            <h3 className="text-xl font-extrabold text-indigo-900">Core Mission: The Anchor</h3>
                        </div>
                        <p className="text-lg text-gray-700 font-medium leading-relaxed">
                            To guide, mentor, and ensure every student graduates with a strong sense of direction, purpose, and innovation required to lead in the digital era.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoundersProfile;