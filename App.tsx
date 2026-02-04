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
        <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
          <div className="max-w-md w-full">
            <div className="glass-panel rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 text-center space-y-4 md:space-y-6 border border-white/20">
              <div className="flex justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg p-2">
                  <img src="/logo.svg" alt="Geolocalízame" className="w-full h-full" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Geolocalízame</h1>
                <p className="text-slate-300 text-xs md:text-sm">Rastreo satelital en vivo</p>
              </div>
              <div className="pt-2 md:pt-4">
                <SignInButton mode="modal">
                  <button className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-accent to-secondary rounded-xl text-white font-bold text-base md:text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-3">
                    <span className="material-symbols-outlined text-xl md:text-2xl">login</span>
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
        {/* Contenedor principal: full screen en móvil, 16:9 en desktop */}
        <div className="relative w-full h-screen bg-background-dark md:flex md:items-center md:justify-center overflow-hidden">
          
          {/* 
             16:9 Container para desktop, full screen en móvil
             - En móvil: usa todo el viewport (w-screen h-screen)
             - En desktop (md:): aspect-video con max constraints
          */}
          <div className="relative w-screen h-screen md:w-full md:h-full md:max-w-[177.78vh] md:max-h-[56.25vw] md:aspect-video bg-background-light dark:bg-background-dark md:shadow-2xl overflow-hidden flex flex-col font-body text-slate-800 dark:text-slate-100 transition-colors duration-300 selection:bg-primary selection:text-black">
            
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            
            {sharedLocationName && (
              <div className="absolute top-16 md:top-20 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-50 px-3 md:px-6 py-1.5 md:py-3 bg-secondary/90 backdrop-blur-sm text-white rounded-lg md:rounded-full shadow-2xl flex items-center justify-center gap-1.5 md:gap-2 md:animate-bounce md:max-w-none">
                <span className="material-symbols-outlined text-base md:text-2xl flex-shrink-0">location_on</span>
                <span className="font-bold text-[10px] md:text-base truncate">Ubicación: {sharedLocationName}</span>
              </div>
            )}
            
            <main className="flex-1 relative overflow-hidden">
              <MapArea selectedLocation={selectedLocation} />
              <Sidebar onLocationClick={handleLocationClick} />
            </main>
            
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default App;