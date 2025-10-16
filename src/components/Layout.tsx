import React, { useState, useEffect } from "react";
// NOTE: Assuming Link and useLocation are correctly imported and available in your environment.
import { Link, useLocation } from 'react-router-dom'; 
import { Menu, X, MapPin, Mail, Phone, Twitter, Instagram, Linkedin } from 'lucide-react'; 

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

const SocialLinks = [
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Instagram, href: "#instagram", label: "Instagram" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    // If running without React Router, this hook might throw an error. 
    // You may need to mock this behavior if testing as a standalone component.
    // We keep it as provided by the user.
    const location = useLocation();

    // Effect to handle scroll-based dynamic header styling
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 80;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);
    
    // Function to close the menu after a link is clicked
    const closeMenu = () => setIsMenuOpen(false);

    // Dynamic header and logo classes based on scroll state
    const headerClasses = scrolled 
        ? 'py-2 bg-purple-900/95 backdrop-blur-md shadow-3xl'
        : 'py-4 bg-purple-900/90 backdrop-blur-sm shadow-2xl';
        
    // Adjusted logo size class for better fit on desktop
    const logoSize = scrolled 
        ? 'text-3xl lg:text-4xl' // Increased size for scrolled state
        : 'text-4xl lg:text-5xl'; // Increased size for default state
        
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
                    text-white sticky top-0 **z-60** transition-all duration-500 ease-in-out // 💡 FIX 1: Increased z-index to 60 (above the menu z-50)
                    ${headerClasses}
                `}>
                    <div className="container mx-auto flex justify-between items-center px-4">
                        
                        {/* 1. Logo/Brand (TWO-LINE LAYOUT & CENTERED & INCREASED SIZE) */}
                        <Link to="/" className={`
                            font-extrabold tracking-wide text-white transition-all duration-500 flex flex-col items-center min-w-0 
                        `}>
                            
                            {/* Line 1: MonsterCoders (Uses increased logoSize variable) */}
                            <span className={logoSize}>
                                <span className="text-pink-500">M</span>onster<span className="text-pink-500">C</span>oders
                            </span>
                            
                            {/* Line 2: Apple Logo + IT Training (Increased size) */}
                            <div className="flex items-center mt-[-4px] whitespace-nowrap"> 
    <img 
        src="/applelogo.png" // Adjusted to use the consistent file name
        alt="Apple Logo" 
        className={`
            transition-all duration-500 mr-1
            ${scrolled ? 'h-6' : 'h-8'} // <--- INCREASED APPLE LOGO SIZE
        `}
        style={{ filter: 'grayscale(0) drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))' }} 
    />
    <span className={`
        text-pink-400 font-semibold transition-all duration-500 
        text-lg sm:text-xl lg:text-2xl // <--- INCREASED FONT SIZES
        ${scrolled ? 'text-base sm:text-lg' : 'text-lg lg:text-2xl'} // Adjusted scrolled sizes
    `}>
        IT Training
    </span>
</div>
                            
                        </Link>

                        {/* 2. Desktop Navigation (Pill-Shaped Buttons) */}
                        <nav className="hidden lg:block text-lg font-medium">
                            {/* Reduced spacing for more room on desktop */}
                            <ul className="flex space-x-2 xl:space-x-4">
                                {NavLinks.map(link => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <li key={link.name}>
                                            <Link 
                                                to={link.path} 
                                                className={`
                                                    px-3 py-2 rounded-full border border-pink-500 transition-all duration-300 text-sm lg:text-base font-semibold 
                                                    bg-purple-800/60 hover:bg-purple-700/80
                                                    transform hover:scale-[1.05] hover:shadow-pink-400/50 hover:shadow-xl
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
                                {/* The menu button is now z-60 from the header, so it will show up */}
                                {isMenuOpen ? <X size={30} className="animate-spin-once" /> : <Menu size={30} />}
                            </button>
                        </div>
                    </div>
                </header>

                {/* 4. Mobile Menu Overlay (Enhanced Animation & SCROLLABLE FIX) */}
                <div 
                    className={`
                        fixed **top-[5.5rem]** right-0 **h-[calc(100vh-5.5rem)]** w-64 bg-purple-900/95 backdrop-blur-md **z-50** shadow-2xl // 💡 FIX 2 & 3: Menu starts below header, and height is adjusted. z-index 50 is fine.
                        transition-all duration-500 ease-in-out
                        lg:hidden overflow-y-auto // 💡 FIX 4: Removed unnecessary pt-20
                        ${isMenuOpen 
                            ? 'translate-x-0 opacity-100 scale-100' 
                            : 'translate-x-full opacity-0 scale-95 pointer-events-none'}
                    `}
                >
                    <nav className="flex flex-col p-4 space-y-2"> // 💡 Added p-4 padding here for content spacing
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

                {/* --- 5. Footer Component --- */}
                <footer className="bg-purple-900/90 backdrop-blur-sm text-gray-300 relative z-20 border-t border-pink-500/30">
                    <div className="container mx-auto px-4 py-12">
                        
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
                            
                            {/* Company Info */}
                            <div>
                                <h3 className="text-2xl font-extrabold tracking-wider text-white mb-4">
                                    <span className="text-pink-500">M</span>onster<span className="text-pink-500">C</span>oders
                                </h3>
                                <p className="text-sm leading-relaxed">
                                    Pioneering the future of tech education with cutting-edge curricula and real-world projects.
                                </p>
                                <div className="flex space-x-4 mt-6">
                                    {SocialLinks.map((social) => (
                                        <a key={social.label} href={social.href} aria-label={social.label} 
                                           className="text-pink-400 hover:text-pink-500 transition-colors transform hover:scale-110">
                                            <social.icon size={24} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Quick Links */}
                            <div className="pl-4 md:pl-0">
                                <h4 className="text-xl font-semibold text-pink-400 mb-4 border-b-2 border-pink-500/50 pb-1 inline-block">
                                    Quick Links
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    {NavLinks.slice(0, 4).map(link => ( // Showing only a few key links
                                        <li key={link.name}>
                                            <Link to={link.path} className="hover:text-white transition-colors">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Services/More Links */}
                            <div>
                                <h4 className="text-xl font-semibold text-pink-400 mb-4 border-b-2 border-pink-500/50 pb-1 inline-block">
                                    Resources
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                    <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                                    <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                                      <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                                </ul>
                            </div>

                            {/* Contact Info (Updated) */}
                            <div>
                                <h4 className="text-xl font-semibold text-pink-400 mb-4 border-b-2 border-pink-500/50 pb-1 inline-block">
                                    Connect
                                </h4>
                                <ul className="space-y-3 text-sm">
                                    {/* Updated Address */}
                                    <li className="flex items-start">
                                        <MapPin size={18} className="text-pink-500 mr-3 mt-1 flex-shrink-0" />
                                        <span>Manjeera Trinity Corporate, kphb, Hyd-72</span>
                                    </li>
                                    {/* Primary Email */}
                                    <li className="flex items-center">
                                        <Mail size={18} className="text-pink-500 mr-3" />
                                        <a href="mailto:info@monstercoders.com" className="hover:text-white transition-colors">info@monstercoders.com</a>
                                    </li>
                                    {/* Secondary Email */}
                                       <li className="flex items-center">
                                        <Mail size={18} className="text-pink-500 mr-3" />
                                        <a href="mailto:MonsterCoders@gmail.com" className="hover:text-white transition-colors">MonsterCoders@gmail.com</a>
                                    </li>
                                    {/* Updated Phone Number */}
                                    <li className="flex items-center">
                                        <Phone size={18} className="text-pink-500 mr-3" />
                                        <a href="tel:+918247707851" className="hover:text-white transition-colors">824-7707-851</a>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>

                    {/* Copyright Bar */}
                    <div className="bg-purple-900 py-4 border-t border-purple-700">
                        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
                            &copy; {new Date().getFullYear()} MonsterCoders. All rights reserved. Built with passion.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};


export default Layout;