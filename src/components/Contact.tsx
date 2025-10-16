import React, { useState } from 'react'; 
import { Mail, Phone, MapPin, Send, Globe, Youtube, Facebook } from 'lucide-react'; 

const Contact: React.FC = () => {
    // State for form submission message (replaces alert())
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Placeholder function for form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // **REPLACED ALERT() with state update for UI notification**
        setIsSubmitted(true);
        
        // Hide the message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000); 

        // Placeholder for actual form reset or API submission logic
        console.log("Form submitted. Using state-based success message.");
        (e.target as HTMLFormElement).reset(); // Reset form fields
    };

    // THIS IS THE CORRECT, FULLY FUNCTIONAL EMBED URL FOR MANJEERA TRINITY CORPORATE
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.279624898732!2d78.39003107503794!3d17.48924198357774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc91060965e6d63%3A0x868b136511b84958!2sManjeera%20Trinity%20Corporate!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

    // MonsterCoders Social Links (UPDATED: YouTube and Facebook only)
    const socialLinks = [
        { 
            name: "YouTube Channel", 
            icon: Youtube, 
            href: "https://www.youtube.com/@MonsterCodersIT", 
            color: "text-red-400", 
            label: "MonsterCoders on YouTube"
        },
        { 
            name: "Facebook Page", 
            icon: Facebook, 
            href: "https://www.facebook.com/MonsterCodersIT", 
            color: "text-blue-400", 
            label: "MonsterCoders on Facebook"
        },
    ];

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-100" id="contact">
            <div className="max-w-6xl mx-auto">
                
                <h1 className="text-5xl font-extrabold text-purple-800 text-center mb-4">
                    Connect with the Vision
                </h1>
                <p className="text-xl font-light text-gray-600 text-center mb-12 border-b-2 border-pink-500 pb-2 inline-block mx-auto block">
                    Ready to transform your career? Let’s start the conversation.
                </p>

                <div className="grid lg:grid-cols-5 gap-10">
                    
                    {/* LEFT SECTION (Columns 1-3): The Contact Form */}
                    <div className="lg:col-span-3">
                        {/* Success Message Notification (Replaces alert()) */}
                        {isSubmitted && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl shadow-lg flex items-center justify-between transition-all duration-500">
                                <p className='font-semibold'>
                                    Thank you for your **Inquiry**! We'll get back to you shortly.
                                </p>
                                <button onClick={() => setIsSubmitted(false)} className="ml-4 text-green-700 hover:text-green-900 font-bold">
                                    &times;
                                </button>
                            </div>
                        )}

                        <div 
                            className="p-10 bg-white rounded-2xl shadow-2xl border-t-8 border-pink-600 
                                         transform transition duration-500 hover:shadow-pink-400/50 hover:scale-[1.01]"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                                <Send size={32} className="mr-3 text-pink-600" /> Start Your Transformation
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className='grid sm:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" id="name" name="name" required 
                                            className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-300" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input type="email" id="email" name="email" required 
                                            className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-300" />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" required 
                                        className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-300" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Tell Us About Your Goals</label>
                                    <textarea id="message" name="message" rows={4} required 
                                             className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-50 transform transition duration-300 hover:scale-[1.015]"
                                >
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT SECTION (Columns 4-5): Info & Map */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Map Embed - NOW FUNCTIONAL */}
                        <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-gray-300 h-64 lg:h-80 transition duration-500 hover:shadow-indigo-300/80">
                            <iframe 
                                src={mapEmbedUrl}
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Manjeera Trinity Corporate on Google Maps" 
                            ></iframe>
                        </div>

                        {/* Contact Details Block (Strong Color Block) */}
                        <div className="p-6 bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-2xl shadow-xl">
                            <h2 className="text-2xl font-bold mb-4 flex items-center border-b border-indigo-500 pb-2">
                                <MapPin size={24} className="mr-3 text-pink-400" /> Segment Spaces, Hyderabad
                            </h2>
                            <div className="space-y-3">
                                
                                {/* Address */}
                                <p className="flex items-start text-lg">
                                    <MapPin size={20} className="mr-3 mt-1 text-pink-400 flex-shrink-0" />
                                    <span className='font-medium'>
                                        Manjeera Trinity Corporate, 206, JNTU Rd, K P H B Phase 3, Kukatpally, Hyderabad, Telangana 500072
                                    </span>
                                </p>

                                {/* Phone */}
                                <p className="flex items-center text-lg">
                                    <Phone size={20} className="mr-3 text-pink-400 flex-shrink-0" />
                                    <strong className="text-yellow-300">+91 824 7707 851</strong>
                                </p>
                                
                                {/* Emails */}
                                <div className="space-y-1"> 
                                    {/* Primary Email */}
                                    <p className="flex items-center text-lg">
                                        <Mail size={20} className="mr-3 text-pink-400 flex-shrink-0" />
                                        <a href="mailto:maqs@monstercoders.com" className="hover:text-pink-200 transition duration-300 underline">maqs@monstercoders.com</a>
                                    </p>
                                    {/* Secondary Email */}
                                    <p className="flex items-center text-lg">
                                        {/* Spacer to align with the text above */}
                                        <div className="w-5 mr-3 flex-shrink-0" /> 
                                        <a href="mailto:monstercoders@gmail.com" className="hover:text-pink-200 transition duration-300 underline">monstercoders@gmail.com</a>
                                    </p>
                                </div>
                                
                                {/* Website */}
                                <p className="flex items-center text-lg">
                                    <Globe size={20} className="mr-3 text-pink-400 flex-shrink-0" />
                                    <a href="http://www.monstercoders.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-200 transition duration-300 underline">www.monstercoders.com</a>
                                </p>

                                {/* UPDATED: Social Media Links (YouTube and Facebook only) */}
                                <div className="pt-4 border-t border-indigo-600 mt-4">
                                    <h3 className="text-xl font-bold mb-3">Follow MonsterCoders</h3>
                                    <div className="flex space-x-6">
                                        {socialLinks.map((link) => (
                                            <a 
                                                key={link.name} 
                                                href={link.href} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                title={link.label}
                                                className={`text-white hover:text-pink-400 transition-colors transform hover:scale-110`}
                                            >
                                                <link.icon size={30} className={link.color} /> 
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
