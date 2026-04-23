import React from 'react';

// Tibetan Endless Knot SVG Component
export const EndlessKnot = ({ className = "w-16 h-16", color = "#C1272D" }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 10 L60 20 L70 20 L70 30 L60 30 L60 40 L70 40 L70 50 L60 50 L60 60 L70 60 L70 70 L60 70 L50 80 L40 70 L30 70 L30 60 L40 60 L40 50 L30 50 L30 40 L40 40 L40 30 L30 30 L30 20 L40 20 Z"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 20 L40 30 M60 20 L60 30 M30 40 L40 40 M60 40 L70 40 M40 50 L60 50 M30 60 L40 60 M60 60 L70 60 M40 70 L60 70"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Lotus Flower SVG Component
export const LotusFlower = ({ className = "w-12 h-12", color = "#D4AF37" }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="60" rx="8" ry="12" fill={color} opacity="0.8" />
    <ellipse cx="35" cy="55" rx="10" ry="15" fill={color} opacity="0.6" />
    <ellipse cx="65" cy="55" rx="10" ry="15" fill={color} opacity="0.6" />
    <ellipse cx="25" cy="50" rx="8" ry="18" fill={color} opacity="0.4" />
    <ellipse cx="75" cy="50" rx="8" ry="18" fill={color} opacity="0.4" />
    <circle cx="50" cy="60" r="6" fill={color} />
  </svg>
);

// Corner Decoration Component
export const CornerDecoration = ({ position = "top-left", color = "#C1272D" }) => {
  const getRotation = () => {
    switch (position) {
      case 'top-left': return 'rotate-0';
      case 'top-right': return 'rotate-90';
      case 'bottom-right': return 'rotate-180';
      case 'bottom-left': return 'rotate-270';
      default: return 'rotate-0';
    }
  };

  return (
    <svg className={`w-16 h-16 ${getRotation()}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0 L30 0 L30 5 L10 5 L10 15 L5 15 L5 30 L0 30 Z"
        fill={color}
        opacity="0.3"
      />
      <path
        d="M0 10 L20 10 L20 15 L15 15 L15 20 L10 20 L10 25 L5 25 L5 30"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
};

// Prayer Flag Colors Bar
export const PrayerFlagBar = ({ className = "" }) => (
  <div className={`flex h-1 ${className}`}>
    <div className="flex-1 bg-[#0080C0]"></div>
    <div className="flex-1 bg-white"></div>
    <div className="flex-1 bg-[#C1272D]"></div>
    <div className="flex-1 bg-[#00A651]"></div>
    <div className="flex-1 bg-[#FFD500]"></div>
  </div>
);

// Decorative Border Component
export const TibetanBorder = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    {/* Corner Decorations */}
    <div className="absolute top-0 left-0 opacity-20">
      <CornerDecoration position="top-left" />
    </div>
    <div className="absolute top-0 right-0 opacity-20">
      <CornerDecoration position="top-right" />
    </div>
    <div className="absolute bottom-0 right-0 opacity-20">
      <CornerDecoration position="bottom-right" />
    </div>
    <div className="absolute bottom-0 left-0 opacity-20">
      <CornerDecoration position="bottom-left" />
    </div>
    
    {/* Border */}
    <div className="border-2 border-[#C1272D]/20 rounded-sm">
      {children}
    </div>
  </div>
);
