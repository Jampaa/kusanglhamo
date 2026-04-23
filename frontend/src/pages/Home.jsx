import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { artist } from '../content/siteData';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { EndlessKnot, LotusFlower, PrayerFlagBar } from '../components/TibetanDecorations';
import { getPublishedProjects } from '../api/projects';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const loadProjects = async () => {
      setLoadingProjects(true);
      setProjectsError('');
      try {
        const publishedProjects = await getPublishedProjects();
        setProjects(publishedProjects);
      } catch (error) {
        setProjectsError(error.message || 'Failed to load projects');
      } finally {
        setLoadingProjects(false);
      }
    };
    loadProjects();
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Empty dependency - only run once on mount

  return (
    <div className="min-h-screen bg-[#F5F1E8] relative overflow-hidden">
      {/* Enhanced Tibetan Pattern Background */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="endless-knot" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              <path
                d="M75 20 L90 35 L105 35 L105 50 L90 50 L90 65 L105 65 L105 80 L90 80 L75 95 L60 80 L45 80 L45 65 L60 65 L60 50 L45 50 L45 35 L60 35 Z"
                fill="none"
                stroke="#C1272D"
                strokeWidth="2"
                opacity="0.4"
              />
              <circle cx="75" cy="75" r="8" fill="#D4AF37" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#endless-knot)" />
        </svg>
      </div>

      {/* Decorative Lotus Elements */}
      <div className="absolute top-20 right-10 opacity-10 hidden lg:block">
        <LotusFlower className="w-32 h-32" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-10 hidden lg:block">
        <EndlessKnot className="w-40 h-40" color="#D4AF37" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 relative py-20 lg:py-0">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 z-10">
            {/* Vertical Text Accent - Hidden on mobile */}
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="hidden sm:flex flex-col gap-2">
                <div className="w-0.5 h-12 lg:h-16 bg-[#C1272D]"></div>
                <span
                  className="text-[#C1272D] text-xs tracking-widest font-medium"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  DIGITAL ARTIST
                </span>
              </div>

              <div className="flex-1">
                {/* Mobile Prayer Flag */}
                <div className="sm:hidden mb-4">
                  <PrayerFlagBar className="h-1 mb-2" />
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#2B2B2B] leading-none tracking-tight">
                  <span className="font-['Bebas_Neue',sans-serif] block" style={{ fontWeight: 400, letterSpacing: '0.02em' }}>
                    KUSANG
                  </span>
                  <span className="font-['Bebas_Neue',sans-serif] block text-outline" style={{ fontWeight: 400, letterSpacing: '0.02em' }}>
                    LHAMO
                  </span>
                </h1>

                <div className="mt-4 lg:mt-6 space-y-3 lg:space-y-4">
                  <p className="text-lg sm:text-xl text-[#2B2B2B]/80 font-light tracking-wide">
                    {artist.title}
                  </p>
                  <p className="text-sm sm:text-base text-[#2B2B2B]/60 leading-relaxed max-w-lg font-light">
                    {artist.intro}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6 lg:mt-8">
                  <Link to="/projects" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-[#C1272D] hover:bg-[#A01F25] text-white px-6 sm:px-8 py-5 sm:py-6 text-sm font-medium tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      VIEW WORK
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white px-6 sm:px-8 py-5 sm:py-6 text-sm font-medium tracking-wider transition-all duration-300"
                    >
                      CONTACT
                      <Mail size={18} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right 3D Object */}
          <div className="relative flex items-center justify-center mt-8 lg:mt-0">
            <div
              className="relative w-full max-w-md lg:max-w-lg transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`
              }}
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-[#C1272D]/20 rounded-sm"></div>
              <div className="absolute -inset-2 border border-[#D4AF37]/20 rounded-sm"></div>
              
              <img
                src="https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800&q=80"
                alt="3D Tibetan Art"
                className="w-full h-auto drop-shadow-2xl rounded-sm"
              />
              
              {/* Accent Elements */}
              <div className="absolute -top-8 -right-8 w-24 lg:w-32 h-24 lg:h-32 bg-[#C1272D]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 lg:w-40 h-32 lg:h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
              
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0">
                <EndlessKnot className="w-8 h-8 opacity-30" />
              </div>
              <div className="absolute bottom-0 right-0">
                <LotusFlower className="w-8 h-8 opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-white/30 relative">
        {/* Decorative Prayer Flag */}
        <PrayerFlagBar className="absolute top-0 left-0 right-0" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 lg:mb-12 gap-4">
            <div>
              <h2 className="text-4xl lg:text-5xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide">SELECTED WORK</h2>
              <p className="text-[#2B2B2B]/60 mt-2 text-sm lg:text-base">Recent projects and explorations</p>
            </div>
            <Link to="/projects">
              <Button variant="ghost" className="text-[#C1272D] hover:text-[#A01F25]">
                View All
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          {loadingProjects && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[0, 1, 2].map((item) => (
                <div key={item} className="rounded-sm bg-white shadow-md overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full rounded-none" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {projectsError && (
            <p className="text-sm text-red-600">{projectsError}</p>
          )}
          {!loadingProjects && !projectsError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group relative overflow-hidden rounded-sm bg-white shadow-md hover:shadow-2xl transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-4 lg:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg lg:text-xl font-semibold mb-1">{project.title}</h3>
                    <p className="text-xs lg:text-sm text-white/80">{project.category} · {project.year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;