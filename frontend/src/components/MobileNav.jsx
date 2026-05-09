import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../content/siteData';

const MobileNav = () => {
  const location = useLocation();


  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] text-white border-b border-white/5 shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 shake">
              <img src="/img/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-['Bebas_Neue',sans-serif] tracking-[0.1em]">KUSANG LHAMO</h1>
              <p className="text-[9px] text-white/50">3D Artist · Game Art Student</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] text-white border-t border-white/5 pb-safe shadow-2xl">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-2 transition-all duration-300 min-w-[60px] relative ${
                  isActive
                    ? 'text-white'
                    : 'text-white/40 active:bg-white/5'
                }`}
              >
                <div className={`w-6 h-6 flex items-center justify-center ${isActive ? 'flicker' : ''}`}>
                  <img src={item.icon} alt={item.label} className={`w-full h-full object-contain ${!isActive && 'opacity-50'}`} />
                </div>
                <span className={`text-[8px] font-['Bebas_Neue',sans-serif] tracking-widest ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                  {item.label.toUpperCase()}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-1/3 h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
