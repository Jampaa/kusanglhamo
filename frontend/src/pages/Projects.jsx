import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../content/siteData';
import { ArrowRight } from 'lucide-react';
import { PrayerFlagBar, EndlessKnot } from '../components/TibetanDecorations';
import { Skeleton } from '../components/ui/skeleton';
import { getPublishedProjects } from '../api/projects';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState('');

  useEffect(() => {
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
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.replace('-', ' ')));

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-16 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-24 relative">
      {/* Prayer Flag Accent */}
      <PrayerFlagBar className="absolute top-0 left-0 right-0" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 opacity-5 hidden lg:block">
        <EndlessKnot className="w-40 h-40" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-[#C1272D]"></div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide">
              SELECTED WORK
            </h1>
          </div>
          <p className="text-base lg:text-lg text-[#2B2B2B]/60 max-w-2xl ml-0 lg:ml-4">
            A collection of my 3D projects focused on environment design, props, and game-ready assets.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mb-8 lg:mb-12 pb-6 lg:pb-8 border-b-2 border-[#C1272D]/20">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 lg:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#C1272D] text-white shadow-lg scale-105'
                  : 'bg-white text-[#2B2B2B]/60 hover:bg-[#2B2B2B]/5 hover:text-[#2B2B2B]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loadingProjects && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="rounded-sm bg-white shadow-md overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}
        {projectsError && <p className="text-sm text-red-600">{projectsError}</p>}
        {!loadingProjects && !projectsError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group relative overflow-hidden rounded-sm bg-white shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#C1272D]/20"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${index * 50}ms`,
                opacity: 0
              }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Tibetan Corner Accent */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-[#C1272D] opacity-50"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-[#D4AF37] opacity-50"></div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
                      <span>{project.category}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center text-xs lg:text-sm text-[#C1272D] font-medium">
                      View Project
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Bar */}
              <div className="p-4 bg-white relative">
                {/* Prayer Flag Accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 flex">
                  <div className="flex-1 bg-[#0080C0] opacity-30"></div>
                  <div className="flex-1 bg-white opacity-30"></div>
                  <div className="flex-1 bg-[#C1272D] opacity-30"></div>
                  <div className="flex-1 bg-[#00A651] opacity-30"></div>
                  <div className="flex-1 bg-[#FFD500] opacity-30"></div>
                </div>
                
                <h3 className="font-semibold text-[#2B2B2B] text-base lg:text-lg mb-1 group-hover:text-[#C1272D] transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs lg:text-sm text-[#2B2B2B]/60">
                  <span>{project.category}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;