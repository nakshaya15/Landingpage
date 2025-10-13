// src/Home.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    // Outer container ensures all content is centered and takes up full width
    <div className="flex flex-col items-center pt-8 pb-12 w-full"> 
      
      {/* Main Video Card */}
      <section className="flex justify-center px-4 py-8 w-full">
        <div className="
                // Centered Card Container
                p-0 shadow-2xl rounded-3xl w-full max-w-3xl 
                overflow-hidden 
                
                // Original Impressive Styles
                transform transition duration-500 
                hover:scale-105 hover:shadow-purple-500/50 
                bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400
            ">
          <video
            className="w-full h-72 object-cover"
            controls
            muted
            playsInline
            loop
            autoPlay
          >
            <source src="/aiii.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

export default Home;