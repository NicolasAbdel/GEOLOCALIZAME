import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapArea from './components/MapArea';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sharedLocationName, setSharedLocationName] = useState<string | null>(null);

  const handleLocationClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  // Detectar si se compartió una ubicación via URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lng = params.get('lng');
    const name = params.get('name');
    
    if (lat && lng) {
      setSelectedLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
      if (name) {
        setSharedLocationName(decodeURIComponent(name));
      }
    }
  }, []);

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
    <>
      {/* Pantalla de Login */}
      <SignedOut>
        <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="max-w-md w-full mx-4">
            <div className="glass-panel rounded-3xl shadow-2xl p-8 text-center space-y-6 border border-white/20">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg p-2">
                  <img src="/logo.svg" alt="Geolocalízame" className="w-full h-full" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Geolocalízame</h1>
                <p className="text-slate-300 text-sm">Rastreo satelital en vivo</p>
              </div>
              <div className="pt-4">
                <SignInButton mode="modal">
                  <button className="w-full py-4 px-6 bg-gradient-to-r from-accent to-secondary rounded-xl text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined">login</span>
                    Iniciar Sesión
                  </button>
                </SignInButton>
              </div>
              <p className="text-xs text-slate-400">Accede de forma segura con Clerk</p>
            </div>
          </div>
        </div>
      </SignedOut>

      {/* App Principal (Solo cuando está autenticado) */}
      <SignedIn>
        {/* Outer container: Centers the app and handles the letterboxing background */}
        <div className="relative w-full h-screen flex items-center justify-center bg-background-dark overflow-hidden">
          
          {/* 
             16:9 Container 
             - aspect-video enforces 16/9
             - w-full / h-full with max constraints ensures it fits without scrolling
             - shadow-2xl separates it from the letterbox background
          */}
          <div className="relative w-full max-w-[177.78vh] h-full max-h-[56.25vw] aspect-video bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden flex flex-col font-body text-slate-800 dark:text-slate-100 transition-colors duration-300 selection:bg-primary selection:text-black">
            
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            
            {sharedLocationName && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-secondary/90 backdrop-blur-sm text-white rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
                <span className="material-symbols-outlined">location_on</span>
                <span className="font-bold">Ubicación compartida: {sharedLocationName}</span>
              </div>
            )}
            
            <main className="flex-1 relative overflow-hidden flex">
              <Sidebar onLocationClick={handleLocationClick} />
              <MapArea selectedLocation={selectedLocation} />
            </main>
            
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default App;