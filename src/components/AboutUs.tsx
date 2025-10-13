// src/components/AboutUs.tsx
import React from 'react';
import { Briefcase, Zap, Heart } from 'lucide-react'; // Assuming you have lucide-react or similar icon library installed

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

// Reusable animated Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, content }) => {
  return (
    <div 
      className="
        bg-white p-6 rounded-xl shadow-lg transition-all duration-300 
        border-t-4 border-pink-500
        hover:scale-[1.05] 
        hover:shadow-2xl 
        hover:shadow-purple-500/50 
        transform 
        cursor-default
      "
    >
      <div className="text-purple-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-indigo-700 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
};

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-4">
           MonsterCoders 
        </h1>
        <p className="text-xl text-pink-300 text-center mb-12">
          Transforming Students into Tech Innovators since 2001
        </p>

        {/* Introduction Section */}
        <div className="bg-purple-900 bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-inner mb-12">
          <p className="text-xl text-white mb-4 leading-relaxed font-semibold">
            Founded in 2001, MonsterCoders was born with a powerful mission —
            to guide, mentor, and transform graduates into confident, industry-ready IT professionals who can innovate, create, and lead in today's digital era.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            At MonsterCoders, we go beyond traditional training. We don't just teach technology — we build technologists. Our focus is to prevent career missteps, eliminate gaps, and empower students with a strong sense of direction, purpose, and innovation.
          </p>
        </div>

        {/* Animated Feature Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Card 1: Technical Transformation */}
          <FeatureCard
            icon={<Briefcase size={40} strokeWidth={2.5} />}
            title="Students Feedback"
            content="Our students experience a complete transformation — from being uncertain beginners to highly skilled full-stack professionals capable of building end-to-end applications using the latest technologies in Java, Python, and AI/ML."
          />
          
          {/* Card 2: Career Success */}
          <FeatureCard
            icon={<Zap size={40} strokeWidth={2.5} />}
            title="Placement & Performance"
            content="They don’t just crack interviews with leading MNCs like Tech Mahindra, Wipro, Infosys, and HCL — they thrive on the job, add value, and become true assets to their organizations."
          />
          
          {/* Card 3: Mindset & Vision */}
          <FeatureCard
            icon={<Heart size={40} strokeWidth={2.5} />}
            title="The Growth Mindset"
            content="Our transformation doesn’t stop at technology. We nurture resilience, optimism, and confidence to handle any challenge. Real success comes when technology meets the right attitude, purpose, and vision."
          />
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;