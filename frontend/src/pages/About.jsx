import React from 'react';
import { artist, skills } from '../content/siteData';
import { Mail, MapPin } from 'lucide-react';

const About = () => {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#111] text-white py-24 px-8 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-7xl lg:text-9xl font-['Bebas_Neue',sans-serif] text-white tracking-[0.2em] mb-4 flicker">
            ABOUT
          </h1>
        </div> 

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="aspect-[3/4] overflow-hidden rounded-sm border border-white/10 group-hover:border-white/30 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                  alt="Kusang Lhamo"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Decorative futuristic frame */}
              <div className="absolute -inset-4 border border-white/5 -z-10 group-hover:border-white/20 transition-all duration-500"></div>
            </div>

            {/* Contact Info Card */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-sm p-8 flicker-slow">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-white/40 mt-1" />
                  <div>
                    <p className="text-[10px] text-white/30 mb-1 uppercase tracking-[0.2em]">Location</p>
                    <p className="text-sm text-white/80 font-medium tracking-wide">{artist.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-white/40 mt-1" />
                  <div>
                    <p className="text-[10px] text-white/30 mb-1 uppercase tracking-[0.2em]">Email</p>
                    <a href={`mailto:${artist.email}`} className="text-sm text-white/80 font-medium hover:text-white transition-colors tracking-wide">
                      {artist.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-['Bebas_Neue',sans-serif] text-white tracking-[0.3em] mb-8">
                  DIGITAL WORLD BUILDER
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-white/60 leading-relaxed mb-6 font-light tracking-wide">
                    {artist.bio}
                  </p>
                </div>
              </div>

              {/* Futuristic Quote */}
              <div className="relative bg-white/[0.03] rounded-sm p-10 border-l-2 border-white/20 flicker-slow">
                <p className="text-2xl text-white/80 italic font-light leading-relaxed tracking-wide">
                  "I believe great 3D art lies at the intersection of storytelling and technical mastery."
                </p>
              </div>

              {/* Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/5 p-8 hover:bg-white/[0.08] transition-all duration-500">
                  <h3 className="text-lg font-['Bebas_Neue',sans-serif] tracking-widest text-white mb-4">Creative Vision</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    Blending organic aesthetics with digital precision to create immersive, high-fidelity experiences.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/5 p-8 hover:bg-white/[0.08] transition-all duration-500">
                  <h3 className="text-lg font-['Bebas_Neue',sans-serif] tracking-widest text-white mb-4">Technical Focus</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    Optimized game-ready workflows with extreme attention to topology, PBR texturing, and performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-32">
          <h2 className="text-4xl font-['Bebas_Neue',sans-serif] text-white tracking-[0.4em] mb-12 text-center lg:text-left">
            ARSENAL
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(groupedSkills).map(([category, skillsList]) => (
              <div key={category} className="bg-white/[0.02] border border-white/5 p-8 group hover:border-white/20 transition-all duration-500">
                <h3 className="text-[10px] font-bold text-white/20 mb-6 uppercase tracking-[0.3em]">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {skillsList.map((skill) => (
                    <li key={skill} className="flex items-center gap-4 text-white/60 group-hover:text-white/90 transition-colors">
                      <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                      <span className="text-sm font-light tracking-wide">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;