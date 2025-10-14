import React, { useState } from "react";
import { Link } from 'react-router-dom'; 
import { Menu, X } from 'lucide-react'; // Import icons for the hamburger menu

interface LayoutProps {
    children: React.ReactNode;
}

const NavLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Vision & Mission', path: '/vision-mission' },
    { name: 'Founders Profile', path: '/founders' },
    { name: 'Courses', path: '/courses' },
    { name: 'Placements', path: '/placements' },
    { name: 'Contact', path: '/contact' },
    { name: 'Clients', path: '/clients' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // State to manage the mobile menu's open/closed status
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Function to close the menu after a link is clicked
    const closeMenu = () => setIsMenuOpen(false);

    return (
        // The outer div is set to min-h-screen and relative to contain the children
        <div className="min-h-screen relative overflow-x-hidden">
            
            {/* Background Video (Fixed and at the lowest z-index) */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
            >
                {/* FINAL CHECK: Path should be in your public folder */}
                <source src="/aii.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Background Overlay (Layer Z-10, fixed position) */}
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 z-10"></div>

            {/* Main Content Wrapper (z-20 flex container) */}
            <div className="relative z-20 flex flex-col min-h-screen">
                
                {/* Header (z-50 and sticky for prominence) */}
                <header className="
                    bg-purple-900/95 backdrop-blur-sm text-white py-4 shadow-2xl 
                    sticky top-0 z-50 transition-all duration-300
                ">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        
                        {/* 1. Logo/Brand */}
                        <Link to="/" className="text-4xl font-extrabold tracking-wide text-white">
                            <span className="text-pink-500">M</span>onster<span className="text-pink-500">C</span>oders
                        </Link>

                        {/* 2. Desktop Navigation (Hidden on small screens) */}
                        <nav className="hidden lg:block text-lg font-medium">
                            <ul className="flex space-x-7">
                                {NavLinks.map(link => (
                                    <li key={link.name}>
                                        <Link 
                                            to={link.path} 
                                            className="hover:text-pink-400 transition-colors duration-300 relative group"
                                        >
                                            {link.name}
                                            {/* Elegant underline hover effect */}
                                            <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* 3. Mobile Menu Button (Visible on small screens) */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white hover:text-pink-400 p-2 rounded-md transition duration-300 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
                            </button>
                        </div>
                    </div>
                </header>

                {/* 4. Mobile Menu Overlay (Conditional visibility) */}
                <div 
                    className={`
                        fixed top-20 right-0 h-full w-64 bg-purple-900/95 backdrop-blur-sm z-40 shadow-2xl 
                        transform transition-transform duration-500 ease-in-out 
                        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                        lg:hidden
                    `}
                >
                    <nav className="flex flex-col p-4 space-y-2">
                        {NavLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={closeMenu}
                                className="block text-xl font-semibold text-white p-3 rounded-lg hover:bg-purple-800 hover:text-pink-400 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                
                {/* Main content area */}
                <main className="flex-grow z-20"> 
                    {children}
                </main>
                
                {/* Optional: Footer component can go here */}
            </div>
        </div>
    );
};

export default Layout;
