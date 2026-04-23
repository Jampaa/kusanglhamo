import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, User, Mail, Instagram } from 'lucide-react';
import { artist } from '../content/siteData';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'HOME', icon: Home },
    { path: '/projects', label: 'PROJECTS', icon: Briefcase },
    { path: '/about', label: 'ABOUT', icon: User },
    { path: '/contact', label: 'CONTACT', icon: Mail }
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-40 bg-[#3A3A3A] text-white z-50 flex-col">
      {/* Tibetan Prayer Flag Colors */}
      <div className="h-1 flex">
        <div className="flex-1 bg-[#0080C0]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#C1272D]"></div>
        <div className="flex-1 bg-[#00A651]"></div>
        <div className="flex-1 bg-[#FFD500]"></div>
      </div>
      
      {/* Logo */}
      <Link to="/" className="p-6 border-b border-white/10">
        <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center">
          <span className="text-[#C1272D] font-bold text-xl">KL</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 py-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-2 py-6 px-4 transition-all duration-300 relative group ${
                isActive ? 'text-[#C1272D]' : 'text-white/60 hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-1 bg-[#C1272D]"></div>
              )}
              <Icon size={20} strokeWidth={1.5} />
              <span className="text-[10px] font-medium tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Social Icons */}
      <div className="p-6 border-t border-white/10 space-y-4">
        <a
          href={artist.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-[#C1272D] transition-all duration-300"
        >
          <Instagram size={16} />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;