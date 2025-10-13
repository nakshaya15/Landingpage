// src/components/Layout.tsx
import React from "react";
import { Link } from 'react-router-dom'; 

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        // The outer div is set to min-h-screen and relative to contain the children
        <div className="min-h-screen relative overflow-auto">
            
            {/* Background Video (Aggressive Positioning) */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                // CRITICAL FIX: Ensure it is fixed and at the lowest z-index
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
            >
                {/* FINAL CHECK: Path should be in your public folder */}
                <source src="/aii.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Background Overlay (Layer Z-10, fixed position) */}
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 z-10"></div>

            {/* Main Content Wrapper (z-20 and z-30) */}
            <div className="relative z-20 flex flex-col min-h-screen">
                
                {/* Header (z-40 and sticky) */}
                <header className="
                    bg-purple-900/90 backdrop-blur-sm text-white py-3 shadow-2xl 
                    sticky top-0 z-40 transition-all duration-300
                ">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                        {/* ... Navigation omitted for brevity ... */}
                        <div className="flex justify-between w-full md:w-auto items-center mb-2 md:mb-0">
                            <Link to="/" className="text-3xl font-extrabold tracking-wide hover:text-pink-400 transition-colors">
                                MonsterCoders
                            </Link>
                        </div>
                        <nav className="text-sm font-medium">
                            <ul className="flex flex-wrap justify-center space-x-4">
                                <li><Link to="/about" className="hover:text-pink-400 transition-colors">About Us</Link></li>
                                <li><Link to="/vision-mission" className="hover:text-pink-400 transition-colors">Vision & Mission</Link></li>
                                <li><Link to="/founders" className="hover:text-pink-400 transition-colors">Founders Profile</Link></li>
                                <li><Link to="/courses" className="hover:text-pink-400 transition-colors">Courses</Link></li>
                                <li><Link to="/placements" className="hover:text-pink-400 transition-colors">Placements</Link></li>
                                <li><Link to="/contact" className="hover:text-pink-400 transition-colors">Contact</Link></li>
                                <li><Link to="/clients" className="hover:text-pink-400 transition-colors">Clients</Link></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-grow z-20"> 
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;