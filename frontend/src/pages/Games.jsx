import React from 'react';

const Games = () => {
  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center p-8 text-center">
      <div className="w-32 h-32 mb-8 flicker">
        <img src="/img/games.png" alt="Games" className="w-full h-full object-contain" />
      </div>
      <h1 className="text-6xl font-['Bebas_Neue',sans-serif] tracking-widest mb-4">GAMES WILL BE HERE</h1>
      <p className="text-white/40 tracking-[0.2em] max-w-md">
        I am currently developing immersive experiences. Stay tuned for playable prototypes and game-ready environments.
      </p>
      
      {/* Decorative futuristic elements */}
      <div className="mt-12 flex gap-4">
        <div className="w-20 h-0.5 bg-white/10"></div>
        <div className="w-2 h-2 rounded-full bg-white/20 flicker"></div>
        <div className="w-20 h-0.5 bg-white/10"></div>
      </div>
    </div>
  );
};

export default Games;
