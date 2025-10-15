import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, Firestore, collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

// --- Utility Functions for Validation ---
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateMobile = (mobile: string) => /^\d{10}$/.test(mobile);

// Define the shape of the data for better type safety
interface RegistrationData {
    studentName: string;
    qualification: string;
    yearOfPassing: string;
    working: 'yes' | 'no';
    course: string;
    mobile: string;
    email: string;
    timestamp?: any;
}

// --- Component for a single, compact, and colorful registration card ---
const RegistrationCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    animatedGradientClass: string;
    accentColor: string;
    onRegisterClick: (course: string) => void;
}> = ({ title, icon, animatedGradientClass, accentColor, onRegisterClick }) => {

    const cardRef = useRef<HTMLDivElement>(null);

    // --- Interactive Tilt Effect Logic ---
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const tiltX = (e.clientY - centerY) / (rect.height / 2);
            const tiltY = (e.clientX - centerX) / (rect.width / 2);

            const maxTilt = 4;

            card.style.transform = `perspective(1000px) rotateX(${-tiltX * maxTilt}deg) rotateY(${tiltY * maxTilt}deg)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        // Single Card Container with Animated Gradient Background
        <div
            ref={cardRef} // Reference for the tilt effect
            className={`
                p-4 rounded-xl shadow-2xl
                flex flex-col items-center text-center justify-between h-full text-white
                border-2 border-white/10 overflow-hidden
                ${animatedGradientClass}
                transition-transform duration-300 ease-out
                transform-gpu
            `}
            style={{
                transition: 'transform 0.5s ease-out',
                backdropFilter: 'blur(3px)'
            }}
        >

            <div className="flex flex-col items-center">
                {/* Icon */}
                <div className={`text-4xl mb-2 ${accentColor} drop-shadow-lg [text-shadow:0_0_8px_var(--tw-shadow-color)] shadow-black/80`}>
                    {icon}
                </div>

                {/* Title */}
                <h2 className={`text-xl md:text-2xl font-bold tracking-tight mb-2 text-white`}>
                    {title}
                </h2>

                {/* Descriptive Text */}
                <p className="mb-4 text-xs text-gray-200">
                    Discover cutting-edge programs designed for modern industry leaders.
                </p>
            </div>

            {/* Register Button - With Enhanced Glow */}
            <button
                onClick={() => onRegisterClick(title)}
                className={`
                    mt-auto px-4 py-2 w-full sm:w-auto
                    bg-transparent ${accentColor} text-xs font-semibold uppercase rounded-full
                    border-2 border-current shadow-lg shadow-current/50
                    hover:bg-current hover:text-gray-900
                    transition duration-300 transform hover:scale-105
                `}
            >
                Register for {title}
            </button>
        </div>
    );
}

// Generic InputField component (Updated for dark theme consistency)
const InputField: React.FC<{ 
    label: string; 
    name: keyof RegistrationData; 
    type?: string; 
    placeholder?: string; 
    error?: string; 
    ref?: React.Ref<HTMLInputElement>;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}> = ({ label, name, type = 'text', placeholder, error, ref, value, onChange }) => (
    <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-1" htmlFor={name}>
            {label}
        </label>
        <input
            ref={ref}
            // 🟢 Applied dark theme classes to InputField: light text, dark background
            className={`
                shadow appearance-none border rounded w-full py-2 px-3 
                text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:ring-2 
                ${error ? 'border-red-500 ring-red-500' : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500'}
            `}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
        {error && <p className="text-red-400 text-xs italic mt-1">{error}</p>}
    </div>
);


// --- Registration Form Modal Component (Refactored for compactness) ---
const RegistrationFormModal: React.FC<{
    course: string;
    onClose: () => void;
    onSave: (data: RegistrationData) => Promise<void>;
}> = ({ course, onClose, onSave }) => {

    const initialFormData: RegistrationData = {
        studentName: '',
        qualification: '',
        yearOfPassing: '',
        working: 'no',
        course: course,
        mobile: '',
        email: '',
    };

    const [formData, setFormData] = useState<RegistrationData>(initialFormData);
    const [errors, setErrors] = useState({ mobile: '', email: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const studentNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setFormData(prev => ({ ...prev, course }));
        const timer = setTimeout(() => {
            if (studentNameRef.current) {
                studentNameRef.current.focus();
            }
        }, 50);
        return () => clearTimeout(timer);
    }, [course]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        let nextValue = value;
        if (name === 'mobile' && value.length > 10) {
            nextValue = value.slice(0, 10);
        }

        setFormData(prev => ({ ...prev, [name]: nextValue as any }));

        if (name === 'mobile') {
            setErrors(prev => ({ ...prev, mobile: '' }));
        } else if (name === 'email') {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        const newErrors = { mobile: '', email: '' };

        if (!formData.studentName || !formData.qualification || !formData.yearOfPassing) {
            setSaveError("Please fill in all academic details.");
            return;
        }

        if (!validateMobile(formData.mobile)) {
            newErrors.mobile = 'Mobile must be a 10-digit number.';
            valid = false;
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            setIsSaving(true);
            setSaveError(null);

            try {
                const dataToSave = {
                    ...formData,
                    timestamp: serverTimestamp(),
                };

                await onSave(dataToSave);

                setIsSubmitted(true);
            } catch (error) {
                console.error("Error saving document:", error);
                setSaveError("Failed to save registration. Please check your connection.");
            } finally {
                setIsSaving(false);
            }
        }
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm text-center transform transition duration-300 scale-100">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
                    <p className="text-gray-700 mb-6">
                        Thank you, **{formData.studentName || 'Student'}**! You have successfully registered for the **{formData.course}** program.
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        // Modal Overlay
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition duration-300 ease-out">
            {/* Modal Content */}
            <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg p-6 border border-purple-500/50 transform transition duration-300 ease-out scale-100">

                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                    <h2 className="text-2xl font-bold text-white">Enrollment for <span className="text-fuchsia-400">{course}</span></h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition duration-300 text-xl font-bold p-1">
                        &times;
                    </button>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>

                    {/* Student Name (Full Width) */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-1" htmlFor="studentName">
                            Student Name
                        </label>
                        <input
                            ref={studentNameRef} // <-- Initial focus still applied here
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:ring-2 border-gray-600 focus:border-purple-500 focus:ring-purple-500`}
                            id="studentName"
                            name="studentName"
                            type="text"
                            placeholder="John Doe"
                            value={formData.studentName as string}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Academic Details: Qualification & Year of Passing (Side by Side) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Qualification */}
                        <InputField 
                            label="Qualification (e.g. B.Tech)" 
                            name="qualification" 
                            placeholder="B.Tech, M.S." 
                            value={formData.qualification}
                            onChange={handleChange}
                        />

                        {/* Year of Passing */}
                        <InputField 
                            label="Year of Passing" 
                            name="yearOfPassing" 
                            type="number" 
                            placeholder="2022" 
                            value={formData.yearOfPassing}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Status & Course: Working Status & Course Select (Side by Side) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        
                        {/* Working Status (Radio buttons) */}
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Working Status</label>
                            <div className="flex space-x-4 h-full items-center">
                                <label className="inline-flex items-center text-gray-300">
                                    <input
                                        type="radio"
                                        name="working"
                                        value="yes"
                                        checked={formData.working === 'yes'}
                                        onChange={handleChange}
                                        className="form-radio text-purple-600 bg-gray-700 border-gray-600"
                                    />
                                    <span className="ml-2">Yes</span>
                                </label>
                                <label className="inline-flex items-center text-gray-300">
                                    <input
                                        type="radio"
                                        name="working"
                                        value="no"
                                        checked={formData.working === 'no'}
                                        onChange={handleChange}
                                        className="form-radio text-purple-600 bg-gray-700 border-gray-600"
                                    />
                                    <span className="ml-2">No</span>
                                </label>
                            </div>
                        </div>

                        {/* Course to be Attended (Select field) */}
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-1" htmlFor="course">
                                Course to be Attended
                            </label>
                            <select
                                className="
                                    shadow border rounded w-full py-2 px-3 h-[42px] /* Adjusted height for alignment */
                                    text-gray-300 leading-tight              
                                    focus:outline-none focus:ring-2
                                    border-gray-600 bg-gray-700             
                                    focus:border-purple-500 focus:ring-purple-500
                                "
                                id="course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                            >
                                <option value="AI Training" className="bg-gray-700 text-gray-300">AI Training</option>
                                <option value="Java/Python Fullstack" className="bg-gray-700 text-gray-300">Java / Python Full Stack Training</option>
                                <option value="Other" className="bg-gray-700 text-gray-300">Other</option>
                            </select>
                        </div>
                    </div>


                    {/* Contact (Full Width Section - Retaining Grid for Mobile/Tablet) */}
                    <div className="border-t border-gray-700 pt-4 mt-2">
                        <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Mobile */}
                            <InputField
                                label="Mobile (10-digits)"
                                name="mobile"
                                type="tel"
                                placeholder="1234567890"
                                error={errors.mobile}
                                value={formData.mobile}
                                onChange={handleChange}
                            />

                            {/* Email */}
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                error={errors.email}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-fuchsia-500/50 transition duration-300 uppercase tracking-wider ${isSaving ? 'bg-gray-500 cursor-not-allowed' : 'bg-fuchsia-600 hover:bg-fuchsia-700'}`}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Submitting...' : 'Submit Registration'}
                        </button>
                        {saveError && <p className="text-red-400 text-sm mt-2 text-center">{saveError}</p>}
                    </div>

                </form>
            </div>
        </div>
    );
};


// ---------------------------------------------------------------------
// --- Home Component (Main Layout) ---
// ---------------------------------------------------------------------
const Home: React.FC = () => {
    // State to manage Modal visibility and selected course
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');

    // --- FIREBASE STATE AND CONFIG ---
    const [db, setDb] = useState<Firestore | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [registrations, setRegistrations] = useState<any[]>([]); // Keep registrations for internal logic if needed, but not displayed

    // Define global config variables (provided by the environment)
    const appId = typeof (window as any).__app_id !== 'undefined' ? (window as any).__app_id : 'default-app-id';
    const firebaseConfig = typeof (window as any).__firebase_config !== 'undefined' ? JSON.parse((window as any).__firebase_config) : null;
    const initialAuthToken = typeof (window as any).__initial_auth_token !== 'undefined' ? (window as any).__initial_auth_token : null;

    // --- 1. FIREBASE INITIALIZATION & AUTH ---
    useEffect(() => {
        if (!firebaseConfig) {
            console.error("Firebase config not found.");
            setIsLoading(false);
            return;
        }

        try {
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestore);

            // Authentication listener
            const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
                if (user) {
                    setUserId(user.uid);
                    console.debug("User authenticated:", user.uid);
                    setIsLoading(false);
                } else {
                    // Sign in anonymously if no token is available, or use the custom token
                    const signInProcess = initialAuthToken
                        ? signInWithCustomToken(firebaseAuth, initialAuthToken)
                        : signInAnonymously(firebaseAuth);

                    signInProcess.then((credential) => {
                        setUserId(credential.user.uid);
                        console.debug("Authentication successful, UID:", credential.user.uid);
                    }).catch((error) => {
                        console.error("Authentication failed:", error);
                    }).finally(() => {
                        setIsLoading(false);
                    });
                }
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            setIsLoading(false);
        }
    }, []); // Run once on mount

    // --- 2. REAL-TIME DATA LISTENER (FIRESTORE) ---
    // Keeping this active to count records for the CSV export if it were re-enabled later
    // but not explicitly displaying the data.
    useEffect(() => {
        if (!db || !userId) return;

        const registrationsCollectionPath = `artifacts/${appId}/public/data/registrations`;
        const q = collection(db, registrationsCollectionPath);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedRegistrations: any[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                fetchedRegistrations.push({
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp?.toDate().toISOString() || 'N/A'
                });
            });
            fetchedRegistrations.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
            setRegistrations(fetchedRegistrations); // Still updates the state, but not displayed
        }, (error) => {
            console.error("Firestore listener failed:", error);
        });

        return () => unsubscribe();
    }, [db, userId, appId]);

    // --- 3. SAVE FUNCTION (FIRESTORE) ---
    const saveRegistration = async (data: RegistrationData) => {
        if (!db || !userId) {
            throw new Error("Database not ready.");
        }
        const registrationsCollectionPath = `artifacts/${appId}/public/data/registrations`;
        const collectionRef = collection(db, registrationsCollectionPath);

        await addDoc(collectionRef, data);
        console.log("Document successfully written!");
    };

    // --- 4. EXPORT FUNCTION (CSV) ---
    // Keeping this function for completeness, even if the button is removed from UI
    const handleExportToCSV = () => {
        if (registrations.length === 0) {
            console.log('No registration data to export!');
            return;
        }

        const headers = [
            'ID', 'Timestamp', 'Student Name', 'Qualification', 'Year of Passing',
            'Working Status', 'Course', 'Mobile', 'Email'
        ];

        const csvRows = registrations.map(reg => [
            reg.id,
            reg.timestamp,
            reg.studentName || '',
            reg.qualification || '',
            reg.yearOfPassing || '',
            reg.working || '',
            reg.course || '',
            reg.mobile || '',
            reg.email || ''
        ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','));

        const csvContent = [headers.join(','), ...csvRows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `registrations_export_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const openModal = (course: string) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse('');
    };

    // Card styling details
    const aiAccent = "text-fuchsia-400";
    const aiAnimatedGradientClass = "ai-shift-gradient animate-gradient-shift";
    const fullstackAccent = "text-lime-300";
    const fullstackAnimatedGradientClass = "fs-shift-gradient animate-gradient-shift";
    const AIIcon = <span role="img" aria-label="AI Chip" className="text-4xl">🧠</span>;
    const FullStackIcon = <span role="img" aria-label="Code Brackets" className="text-4xl">💻</span>;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
                <div className="text-xl font-semibold animate-pulse">
                    Connecting to Registration Service...
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Standard <style> tag now contains all the custom CSS for the gradient animation */}
            <style>{`
                /* Base Gradient Definition (AI Card) */
                .ai-shift-gradient {
                    /* Charcoal Black -> Cyber Pink -> Electric Blue */
                    background: linear-gradient(135deg, #18181b, #be185d, #3b82f6, #18181b);
                    background-size: 300% 300%;
                }
                /* Base Gradient Definition (Fullstack Card) */
                .fs-shift-gradient {
                    /* Deep Teal -> Electric Lime -> Navy Blue */
                    background: linear-gradient(135deg, #0d9488, #a3e635, #1e40af, #0d9488);
                    background-size: 300% 300%;
                }

                /* Keyframes for the shift animation */
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Animation Class */
                .animate-gradient-shift {
                    animation: gradientShift 10s ease infinite;
                }
            `}</style>

            {/* Outer container ensures all content is centered and takes up full width */}
            <div className="flex flex-col items-center pt-8 pb-12 w-full container mx-auto px-4">

                {/* Removed the User ID display and the Export CSV button */}
                {/* <div className="w-full max-w-4xl flex justify-between items-center mb-6">
                    <p className="text-gray-400 text-xs">
                        **Current User ID:** {userId || 'N/A'}
                    </p>

                    <button
                        onClick={handleExportToCSV}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-md transition duration-300 disabled:bg-gray-500"
                        disabled={registrations.length === 0}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <span>Export {registrations.length} Records (CSV)</span>
                    </button>
                </div> */}
                {/* The div above is now commented out */}


                {/* --- 1. Card 1: AI Training (Placed Above Video) --- */}
                <section className="mt-4 mb-6 w-half max-w-xl h-48">
                    <RegistrationCard
                        title="AI Training"
                        icon={AIIcon}
                        animatedGradientClass={aiAnimatedGradientClass}
                        accentColor={aiAccent}
                        onRegisterClick={openModal}
                    />
                </section>

                {/* 2. Main Video Card */}
                <section className="flex justify-center py-0 w-full">
                    <div
                        className="
                            p-0 shadow-2xl rounded-3xl w-full max-w-4xl
                            overflow-hidden
                            transform transition duration-500
                            hover:scale-[1.02] hover:shadow-purple-500/50
                            bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 p-1
                        "
                    >
                        <video
                            className="w-full h-72 object-cover rounded-[1.4rem]"
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

                {/* --- 3. Card 2: Java/Python Fullstack (Placed Below Video) --- */}
                <section className="mt-6 mb-4 w-half max-w-xl h-48">
                    <RegistrationCard
                        title="Java/Python Fullstack"
                        icon={FullStackIcon}
                        animatedGradientClass={fullstackAnimatedGradientClass}
                        accentColor={fullstackAccent}
                        onRegisterClick={openModal}
                    />
                </section>
            </div>

            {/* --- Registration Modal (Rendered Conditionally) --- */}
            {isModalOpen && <RegistrationFormModal course={selectedCourse} onClose={closeModal} onSave={saveRegistration} />}
        </>
    );
};

export default Home;