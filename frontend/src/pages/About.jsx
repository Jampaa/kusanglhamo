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
    <div className="min-h-screen bg-[#F5F1E8] py-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-7xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide mb-4">
            ABOUT
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                  alt="Kusang Lhamo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-[#C1272D] rounded-sm -z-10"></div>
            </div>

            {/* Contact Info Card */}
            <div className="mt-8 bg-white rounded-sm p-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#C1272D] mt-1" />
                  <div>
                    <p className="text-xs text-[#2B2B2B]/60 mb-1 uppercase tracking-wider">Location</p>
                    <p className="text-sm text-[#2B2B2B] font-medium">{artist.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-[#C1272D] mt-1" />
                  <div>
                    <p className="text-xs text-[#2B2B2B]/60 mb-1 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${artist.email}`} className="text-sm text-[#2B2B2B] font-medium hover:text-[#C1272D] transition-colors">
                      {artist.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide mb-6">
                  HIMALAYAN VISUAL CREATOR
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-[#2B2B2B]/80 leading-relaxed mb-4">
                    {artist.bio}
                  </p>
                </div>
              </div>

              {/* Decorative Quote */}
              <div className="relative bg-gradient-to-br from-[#C1272D]/5 to-[#D4AF37]/5 rounded-sm p-8 border-l-4 border-[#C1272D]">
                <p className="text-xl text-[#2B2B2B]/70 italic font-light leading-relaxed">
                  "I believe great 3D art lies at the intersection of cultural storytelling and technical mastery."
                </p>
              </div>

              {/* Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-sm p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">Creative Vision</h3>
                  <p className="text-sm text-[#2B2B2B]/70 leading-relaxed">
                    Blending traditional Tibetan aesthetics with modern digital workflows to create immersive, culturally rich experiences.
                  </p>
                </div>
                <div className="bg-white rounded-sm p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-[#2B2B2B] mb-3">Technical Focus</h3>
                  <p className="text-sm text-[#2B2B2B]/70 leading-relaxed">
                    Optimized game-ready assets with attention to topology, texturing, and real-time performance without compromising visual quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-4xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide mb-8">
            TOOLS & SOFTWARE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedSkills).map(([category, skillsList]) => (
              <div key={category} className="bg-white rounded-sm p-6 shadow-md">
                <h3 className="text-sm font-semibold text-[#C1272D] mb-4 uppercase tracking-wider">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {skillsList.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-[#2B2B2B]/80">
                      <div className="w-1.5 h-1.5 bg-[#C1272D] rounded-full"></div>
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline (Optional) */}
        <div className="mt-20">
          <h2 className="text-4xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide mb-8">
            EDUCATION & EXPERIENCE
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-sm p-8 shadow-md border-l-4 border-[#C1272D]">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-[#2B2B2B]">Game Art Student</h3>
                <span className="text-sm text-[#2B2B2B]/60">2023 - Present</span>
              </div>
              <p className="text-[#2B2B2B]/70">Specializing in environment design and game-ready asset creation</p>
            </div>

            <div className="bg-white rounded-sm p-8 shadow-md border-l-4 border-[#D4AF37]/50">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-[#2B2B2B]">Freelance 3D Artist</h3>
                <span className="text-sm text-[#2B2B2B]/60">2022 - Present</span>
              </div>
              <p className="text-[#2B2B2B]/70">Creating cultural and architectural visualization projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;