// src/App.tsx (Refactored to handle routing)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the common layout component
import Layout from './components/Layout';

// Import the home page content
import Home from './Home'; 

// Import all page components from your components directory
import AboutUs from './components/AboutUs';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Courses from './components/Courses';
//import FoundersProfile from './components/FoundersProfile'; 
//import VisionMission from './components/VisionMission';   
import Placements from './components/Placements';
import FoundersProfile from './components/FounderProfile';
import VisionMission from './components/MissionVision';


const App: React.FC = () => {
  return (
    // Router is needed for navigation
    <Router>
      {/* The Layout component provides the common UI (Header, Background, Navigation) for ALL routes */}
      <Layout>
        <Routes>
          {/* Home Route: Renders the Home component (the main video card) */}
          <Route path="/" element={<Home />} />
          
          {/* Routes for all the navigation links */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/founders" element={<FoundersProfile />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/placements" element={<Placements />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;