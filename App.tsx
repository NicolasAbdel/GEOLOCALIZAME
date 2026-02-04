import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapArea from './components/MapArea';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme based on preference or default to dark
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    // Outer container: Centers the app and handles the letterboxing background
    <div className="relative w-full h-screen flex items-center justify-center bg-background-dark overflow-hidden">
      
      {/* 
         16:9 Container 
         - aspect-video enforces 16/9
         - w-full / h-full with max constraints ensures it fits without scrolling
         - shadow-2xl separates it from the letterbox background
      */}
      <div className="relative w-full max-w-[177.78vh] h-full max-h-[56.25vw] aspect-video bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden flex flex-col font-body text-slate-800 dark:text-slate-100 transition-colors duration-300 selection:bg-primary selection:text-black">
        
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 relative overflow-hidden flex">
          <Sidebar />
          <MapArea />
        </main>
        
      </div>
    </div>
  );
};

export default App;