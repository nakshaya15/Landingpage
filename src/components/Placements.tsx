import React from 'react';
import { Briefcase, Zap, Compass, Lightbulb,  Users } from 'lucide-react'; 

// Reusable Feature/Why Choose Us Card Component (Unique Hover Effect)
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    colorClass: string; // Tailwind color, e.g., 'indigo', 'green'
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, colorClass }) => {
    
    // Dynamic Tailwind classes for styling
    const baseGradient = `bg-gradient-to-br from-${colorClass}-50 to-${colorClass}-100`;
    const iconColor = `text-${colorClass}-600`;
    const titleColor = `text-${colorClass}-800`;
    const borderColor = `border-${colorClass}-600`;
    const ringColor = `ring-${colorClass}-300`;
    const hoverShadow = `shadow-${colorClass}-400/60`;

    return (
        <div 
            className={`
                // Base Styling: Gradient background, large border-left, rounded corners
                ${baseGradient} p-6 rounded-xl shadow-lg border-2 border-transparent 
                
                // Animation & Hover: Smooth lift, colored shadow, and rotation trigger
                transition-all duration-500 transform 
                ${borderColor} border-l-8 
                hover:scale-[1.03] hover:translate-y-[-2px] hover:shadow-2xl ${hoverShadow} 
                
                // Layout
                group relative overflow-hidden flex flex-col cursor-pointer h-full
            `}
        >
            <div className="relative z-10 flex flex-col h-full">
                {/* Icon with expanded ring and rotation effect on hover */}
                <div 
                    className={`p-3 rounded-full bg-white ${iconColor} 
                                ring-4 ring-white inline-block mb-4 
                                transition-all duration-500 
                                group-hover:ring-8 ${ringColor} 
                                group-hover:rotate-[5deg] shadow-md`}>
                    {icon}
                </div>
                {/* Dynamic Title Color */}
                <h3 className={`text-xl font-extrabold ${titleColor} mb-2`}>{title}</h3>
                <p className="text-gray-700 leading-relaxed text-md flex-grow">{description}</p>
            </div>
        </div>
    );
};

const Placements: React.FC = () => {

    const companies = ["Tech Mahindra", "Wipro", "Infosys", "HCL", ];
    
    const featureData: FeatureCardProps[] = [
        {
            icon: <Zap size={24} />,
            title: "Transformation-based Learning",
            description: "You don’t just get trained; you get transformed. Our focus is on career confidence, purpose, and long-term success.",
            colorClass: "indigo",
        },
        {
            icon: <Briefcase size={24} />,
            title: "Real-World Skills & Deployment",
            description: "Build, deploy, and showcase full-fledged applications on the cloud using employer-aligned technology stacks.",
            colorClass: "green",
        },
        {
            icon: <Lightbulb size={24} />,
            title: "Mentorship by Industry Experts",
            description: "Get personally guided by professionals who have built and delivered large-scale, complex projects in the industry.",
            colorClass: "pink",
        },
        {
            icon: <Compass size={24} />,
            title: "Career & Life Growth",
            description: "Develop the clarity, purpose, and problem-solving abilities that elevate your career beyond just coding.",
            colorClass: "purple",
        },
    ];

    return (
        <div className="min-h-screen pt-16 bg-transparent">
            
            {/* --- PLACEMENT SUCCESS HEADER (Gradient & Bold) --- */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-700 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-2xl relative">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-black text-white text-center mb-4 tracking-tight">
                        <span className="text-pink-500">Proven</span> Placements & Alumni Success
                    </h1>
                    <p className="text-xl font-light text-indigo-200 mb-10 max-w-3xl mx-auto">
                        Our graduates are known for their ability to deliver from day one, backed by deep technical knowledge and strong problem-solving abilities.
                    </p>

                    {/* Company Logos/Badges (Enhanced Hover) */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-8">
                        {companies.map((company, index) => (
                            <div 
                                key={index} 
                                className="p-3 px-6 text-xl font-bold text-white bg-pink-500 rounded-full shadow-lg transition duration-300 transform hover:scale-110 hover:bg-pink-400 border border-pink-200"
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* --- WHY CHOOSE US SECTION --- */}
            
            <div className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-transparent"> 
                <div className="max-w-6xl mx-auto">
                    
                    <h2 className="text-4xl font-extrabold text-white text-center mb-10 pb-2 inline-block mx-auto block border-b-4 border-pink-500">
                        Why Choose MonsterCoders?
                    </h2>

                    {/* Feature Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featureData.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>

                    {/* Concluding Statement (Enhanced Hover) */}
                    <div className="mt-16 text-center p-8 bg-white rounded-xl shadow-2xl border-l-8 border-green-500 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-green-400/50 cursor-pointer">
                        <p className="text-3xl font-extrabold text-gray-800 flex flex-col sm:flex-row items-center justify-center">
                            <Users size={36} className="mr-3 mb-2 sm:mb-0 text-green-600" />
                            We don’t produce employees — we create <span className="ml-0 sm:ml-2 text-green-600">INNOVATORS</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Placements;
