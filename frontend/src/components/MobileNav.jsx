import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, User, Mail } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/projects', label: 'Work', icon: Briefcase },
    { path: '/about', label: 'About', icon: User },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#3A3A3A] text-white shadow-lg">
        {/* Tibetan Prayer Flag Colors */}
        <div className="h-1 flex">
          <div className="flex-1 bg-[#0080C0]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#C1272D]"></div>
          <div className="flex-1 bg-[#00A651]"></div>
          <div className="flex-1 bg-[#FFD500]"></div>
        </div>

        <div className="flex items-center justify-center px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center">
              <span className="text-[#C1272D] font-bold text-sm">KL</span>
            </div>
            <div>
              <h1 className="text-xs font-['Bebas_Neue',sans-serif] tracking-wide">KUSANG LHAMO</h1>
              <p className="text-[9px] text-white/70">3D Artist · Game Art Student</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#3A3A3A] text-white shadow-2xl pb-safe">
        {/* Prayer Flag Colors at top of bottom nav */}
        <div className="h-0.5 flex">
          <div className="flex-1 bg-[#0080C0]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#C1272D]"></div>
          <div className="flex-1 bg-[#00A651]"></div>
          <div className="flex-1 bg-[#FFD500]"></div>
        </div>

        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 min-w-[70px] ${
                  isActive
                    ? 'bg-[#C1272D] text-white shadow-lg'
                    : 'text-white/60 hover:text-white active:bg-white/5'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
