import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'; 
import { Menu, X } from 'lucide-react'; 

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State to track if the user has scrolled past a certain point
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation(); // To highlight the active link

    // Effect to handle scroll-based dynamic header styling
    useEffect(() => {
        const handleScroll = () => {
            // Set scrolled to true if pageYOffset is greater than 80px
            const isScrolled = window.scrollY > 80;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Attach scroll listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);
    
    // Function to close the menu after a link is clicked
    const closeMenu = () => setIsMenuOpen(false);

    // Dynamic header and logo classes based on scroll state
    const headerClasses = scrolled 
        ? 'py-2 bg-purple-900/95 backdrop-blur-md shadow-3xl' // Shorter, more blur, stronger shadow
        : 'py-4 bg-purple-900/90 backdrop-blur-sm shadow-2xl'; // Taller, less blur
        
    const logoSize = scrolled 
        ? 'text-3xl' // Slightly smaller when scrolled
        : 'text-4xl'; // Full size at top
        
    // --- Render ---
    return (
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
                <source src="/aii.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Background Overlay (Layer Z-10, fixed position) */}
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 z-10"></div>

            {/* Main Content Wrapper (z-20 flex container) */}
            <div className="relative z-20 flex flex-col min-h-screen">
                
                {/* Header (Dynamic based on scroll) */}
                <header className={`
                    text-white sticky top-0 z-50 transition-all duration-500 ease-in-out 
                    ${headerClasses}
                `}>
                    <div className="container mx-auto flex justify-between items-center px-4">
                        
                        {/* 1. Logo/Brand (Animated Size) */}
                        <Link to="/" className={`font-extrabold tracking-wide text-white transition-all duration-500 ${logoSize}`}>
                            <span className="text-pink-500">M</span>onster<span className="text-pink-500">C</span>oders
                        </Link>

                        {/* 2. Desktop Navigation (Pill-Shaped Buttons) */}
                        <nav className="hidden lg:block text-lg font-medium">
                            <ul className="flex space-x-4">
                                {NavLinks.map(link => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <li key={link.name}>
                                            <Link 
                                                to={link.path} 
                                                className={`
                                                    // Base Button Style (Pill shape, background, border)
                                                    px-4 py-2 rounded-full border border-pink-500 transition-all duration-300 text-base font-semibold
                                                    bg-purple-800/60 hover:bg-purple-700/80
                                                    
                                                    // Animated Effects (Optimistic Lift and Shadow Glow)
                                                    transform hover:scale-[1.05] hover:shadow-pink-400/50 hover:shadow-xl
                                                    
                                                    // Active State (Solid Pink Fill)
                                                    ${isActive 
                                                        ? 'bg-pink-600 text-white border-pink-400 scale-[1.02] shadow-pink-500/70 shadow-lg' 
                                                        : 'text-gray-200'}
                                                `}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* 3. Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white hover:text-pink-400 p-2 rounded-md transition duration-300 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={30} className="animate-spin-once" /> : <Menu size={30} />}
                            </button>
                        </div>
                    </div>
                </header>

                {/* 4. Mobile Menu Overlay (Enhanced Animation) */}
                <div 
                    className={`
                        fixed top-0 right-0 h-full w-64 bg-purple-900/95 backdrop-blur-md z-40 shadow-2xl 
                        transition-all duration-500 ease-in-out
                        lg:hidden pt-20
                        ${isMenuOpen 
                            ? 'translate-x-0 opacity-100 scale-100' 
                            : 'translate-x-full opacity-0 scale-95 pointer-events-none'}
                    `}
                >
                    <nav className="flex flex-col p-4 space-y-2">
                        {NavLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={closeMenu}
                                className="block text-xl font-semibold text-white p-3 rounded-lg hover:bg-purple-800 hover:text-pink-400 transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {/* Optional CTA in Mobile Menu */}
                        <button className="mt-4 py-3 bg-pink-500 text-white font-black rounded-lg shadow-lg hover:bg-pink-600 transition duration-300 transform hover:scale-[1.02]">
                            Join the Crew
                        </button>
                    </nav>
                </div>
                
                {/* Main content area */}
                <main className="flex-grow z-20"> 
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
