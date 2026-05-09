import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, User, Mail, Instagram } from 'lucide-react';
import { artist, navItems } from '../content/siteData';

const Sidebar = () => {
  const location = useLocation();


  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-40 bg-[#1A1A1A] text-white z-50 flex-col border-r border-white/5">
      
      {/* Logo */}
      <Link to="/" className="p-6 border-b border-white/5 flex justify-center">
        <div className="w-16 h-16 flex items-center justify-center shake">
          <img src="/img/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 py-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-2 py-6 px-4 transition-all duration-300 relative group ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              )}
              <div className={`w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isActive ? 'flicker' : ''}`}>
                <img src={item.icon} alt={item.label} className={`w-full h-full object-contain ${!isActive && 'opacity-60 group-hover:opacity-100'}`} />
              </div>
              <span className="text-[10px] font-['Bebas_Neue',sans-serif] tracking-[0.2em]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Social Icons */}
      <div className="p-6 border-t border-white/5 space-y-4">
        <a
          href={artist.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 hover:border-white/40 transition-all duration-300 group"
        >
          <Instagram size={16} className="text-white/40 group-hover:text-white" />
        </a>
      </div>
    </aside>

  );
};

export default Sidebar;