// src/components/Courses.tsx
import React from 'react';
import { Code, Bot, Zap, Package } from 'lucide-react'; 

// Interface for a single course card
interface CourseCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  sections: { title: string; items: string[] }[];
  baseColor: string; 
}

// Reusable Course Card Component with Enhanced Headings
const CourseCard: React.FC<CourseCardProps> = ({ title, subtitle, icon, sections, baseColor }) => {
  
  // Dynamic color classes based on baseColor prop
  const headerBg = `bg-${baseColor}-600`;
  const iconColor = `text-${baseColor}-100`;
  const sectionBg = `bg-${baseColor}-50`;
  const sectionTextColor = `text-${baseColor}-700`; 
  const hoverShadow = `shadow-${baseColor}-500/50`;
  
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-lg transition-all duration-500 overflow-hidden h-full 
        transform hover:scale-[1.02] hover:shadow-2xl hover:${hoverShadow} 
        group cursor-default flex flex-col
      `}
    >
      
      {/* 1. TITLE BLOCK (Now Explicitly Visible with Dark Text) */}
      <div className={`p-6 border-b-4 border-${baseColor}-600`}>
        <div className="flex items-center">
            {/* Icon is now colored according to the card theme, placed outside the header block */}
            <div className={`mr-4 p-1 rounded-full text-${baseColor}-600`}>
                {icon}
            </div>
            <div>
                {/* FIX: Title is now explicitly text-gray-900 (black) */}
                <h3 className="text-2xl font-extrabold text-gray-900">{title}</h3> 
                <p className="text-sm font-medium text-gray-600 mt-0.5">{subtitle}</p>
            </div>
        </div>
      </div>

      {/* 2. COURSE CONTENT/CURRICULUM */}
      <div className="p-0 flex-grow">
        {sections.map((section, index) => (
          <div key={index} className="mb-0">
            
            {/* --- SECTION HEADING --- */}
            <h4 className={`text-lg font-extrabold ${sectionTextColor} ${sectionBg} p-4 uppercase tracking-wide border-t border-gray-100`}>
              {section.title}
            </h4>
            
            {/* --- LIST CONTENT --- */}
            <div className="p-4">
              <ul className="space-y-2 text-gray-700 list-disc pl-5">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm leading-relaxed">
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        ))}
      </div>
      
      {/* Footer/CTA Placeholder */}
      <div className={`p-4 text-center text-sm font-semibold transition duration-300 group-hover:bg-${baseColor}-100 mt-auto`}>
        <span className={`text-${baseColor}-700`}>Learn more & Apply →</span>
      </div>
    </div>
  );
};

// --- Course Data (Unchanged) ---

const Courses: React.FC = () => {
  const courseData: CourseCardProps[] = [
    {
      title: "Java Full Stack Development",
      subtitle: "Master the complete ecosystem of Java technologies.",
      icon: <Code size={24} />,
      baseColor: "indigo",
      sections: [
        { title: "Backend & Core", items: ["Core Java, Advanced Java", "Spring Boot, JUnit, Mockito"] },
        { title: "Microservices & DevOps", items: ["Docker, Kubernetes", "Jenkins, Git"] },
        { title: "Cloud & Databases", items: ["AWS / GCP", "MySQL, Oracle, MongoDB"] },
        { title: "Frontend", items: ["React with TypeScript"] },
      ],
    },
    {
      title: "Python Full Stack Development",
      subtitle: "End-to-end Python-based application development.",
      icon: <Package size={24} />,
      baseColor: "green",
      sections: [
        { title: "Core Development", items: ["Python fundamentals, API creation", "Frontend integration"] },
        { title: "Data Handling & DBs", items: ["Pandas, NumPy, Matplotlib", "MySQL, Oracle, MongoDB"] },
        { title: "Cloud & Deployment", items: ["AWS, Docker", "Jenkins, Kubernetes"] },
      ],
    },
    {
      title: "Artificial Intelligence & ML",
      subtitle: "Become a next-gen AI innovator with a holistic curriculum.",
      icon: <Bot size={24} />,
      baseColor: "purple",
      sections: [
        { title: "Core Foundation", items: ["Python Full Stack", "Data Structures & Algorithms", "Math for AI"] },
        { title: "AI/ML Expertise", items: ["Machine Learning & Deep Learning", "LLM & NLP (Core Intelligence)", "Prompt Engineering"] },
        { title: "Practical Implementation", items: ["Building Chatbots", "AI Models with TTS & STT", "Cloud Deployment", "Knowledge Layer: Data Access for AI Models"] },
      ],
    },
    {
      title: "AI User Training",
      subtitle: "Leverage AI tools for immediate productivity and innovation.",
      icon: <Zap size={24} />,
      baseColor: "pink",
      sections: [
        { title: "Productivity Tools", items: ["Using AI tools like ChatGPT effectively", "Creating Presentations, Word Docs & Excel Dashboards with AI"] },
        { title: "Creative Content", items: ["AI-generated Music & Videos", "Designing Ads & Content with AI"] },
        { title: "Web & Chatbots", items: ["Building Websites & Chatbots using AI"] },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-4">
          Our Intensive Programs
        </h1>
        <p className="text-xl text-pink-300 text-center mb-12">
          At MonsterCoders, training is intensive, structured, and transformation-oriented. Every course is designed to take a student step-by-step from beginner to professional.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courseData.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-lg text-white italic bg-purple-700 bg-opacity-70 p-4 rounded-lg inline-block">
                All programs ensure hands-on experience in real-world full-stack development.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;