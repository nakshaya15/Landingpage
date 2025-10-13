
import React from 'react';
import { Award, Briefcase, TrendingUp, Zap, Star } from 'lucide-react'; 

// Reusable Achievement Block Component (Slightly cleaner styling)
interface AchievementBlockProps {
    icon: React.ReactNode;
    title: string;
    content: React.ReactNode;
    colorClass: string; // e.g., 'pink', 'indigo'
}

const AchievementBlock: React.FC<AchievementBlockProps> = ({ icon, title, content, colorClass }) => {
    
    // Dynamic Tailwind classes
    const ringColor = `ring-${colorClass}-300`; // New: Subtle ring on hover
    const iconBg = `bg-${colorClass}-50`;
    const iconColor = `text-${colorClass}-600`;
    const titleColor = `text-gray-800`;
    const hoverShadow = `shadow-${colorClass}-400/50`;

    return (
        <div 
            className={`
                bg-white p-6 rounded-xl shadow-lg 
                transition-all duration-300 transform 
                border-b-4 border-transparent hover:border-${colorClass}-600 
                hover:scale-[1.02] hover:shadow-2xl hover:${hoverShadow} 
                flex flex-col space-y-3 h-full cursor-pointer
            `}
        >
            <div className={`flex items-center space-x-3`}>
                <div className={`p-3 rounded-full ${iconBg} ${iconColor} flex-shrink-0 ring-4 ${ringColor}`}>
                    {icon}
                </div>
                <h3 className={`text-xl font-extrabold ${titleColor}`}>{title}</h3>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-md">{content}</p>
        </div>
    );
};

const FoundersProfile: React.FC = () => {
  return (
    // FIX 1: Changed bg-gray-100 to bg-transparent to show the video
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        
        {/* FIX 2: Changed text-purple-800 to text-purple-400 for visibility */}
        // Original content: The Authority & Vision

<h1 className="text-5xl font-black text-white text-center mb-4 tracking-tight">
    The Authority & <span className="text-pink-500">Vision</span>
</h1>
        {/* FIX 3: Changed text-indigo-700 to text-indigo-300 for visibility */}
        <h2 className="text-4xl font-light text-indigo-300 text-center mb-12 border-b-4 border-pink-500 pb-3 inline-block mx-auto block">
          Maqs — Founder, MonsterCoders
        </h2>

        {/* INTRODUCTION BLOCK (The inner design remains dark/vibrant as it has its own background) */}
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
          
          {/* Card 1: Global Experience */}
          <AchievementBlock
            icon={<Briefcase size={24} />}
            title="Decade of Global Leadership"
            content={<>Built and led successful technology teams for global giants like <strong className="font-extrabold text-pink-700">GE Power Systems, Ford Motors, TRW, and Caterpillar (USA)</strong>.</>}
            colorClass="pink"
          />
          
          {/* Card 2: Academic & Corporate Roots */}
          <AchievementBlock
            icon={<Award size={24} />}
            title="Elite IIM & Corporate Foundation"
            content={<>An alumnus of <strong className="font-extrabold text-purple-700">IIM Kozhikode</strong> and a former professional at **Tech Mahindra**, combining strategy with technical execution.</>}
            colorClass="purple"
          />
          
          {/* Card 3: Entrepreneurial Success */}
          <AchievementBlock
            icon={<Zap size={24} />}
            title="Proven Entrepreneur"
            content={<>Founded a successful software venture in **2017**, developing and deploying **Inventory and ERP solutions** in partnership with KLite across Chennai businesses.</>}
            colorClass="green"
          />
          
          {/* Card 4: Driving Philosophy (Repurposed for emphasis) */}
          <div className="p-6 bg-indigo-50 rounded-xl shadow-md border-r-4 border-indigo-500 flex flex-col justify-center">
             <div className="flex items-center mb-3">
                 <TrendingUp size={28} className="mr-3 text-indigo-700" />
                 <h3 className="text-xl font-extrabold text-indigo-700">Core Mission</h3>
             </div>
             <p className="text-lg text-gray-700 font-medium leading-relaxed">
                 To guide, mentor, and ensure every student graduates with a strong sense of **direction, purpose, and innovation** required to lead in the digital era.
             </p>
          </div>
        </div>
        
      </div>
    </div>
 );
};

export default FoundersProfile;