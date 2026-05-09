import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../content/siteData';
import { ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-[#111] py-16 lg:py-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left Side: Category Filters (Vertical Stack from sketch) */}
        <div className="w-full lg:w-64 flex flex-col items-center lg:items-start gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-['Bebas_Neue',sans-serif] text-white tracking-[0.2em] mb-8">
              WORK
            </h1>
            
            <div className="flex flex-col gap-4 w-full">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-8 py-4 text-sm font-['Bebas_Neue',sans-serif] tracking-[0.3em] transition-all duration-500 border border-white/10 relative group ${
                    activeCategory === category.id
                      ? 'bg-white text-black flicker'
                      : 'text-white/40 hover:text-white hover:border-white/30 bg-white/5'
                  }`}
                >
                  {category.label.toUpperCase()}
                  {activeCategory === category.id && (
                    <div className="absolute -left-1 top-0 h-full w-0.5 bg-white shadow-[0_0_10px_white]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Diorama/Environment Box (from sketch) */}
          <div className="w-full p-8 border border-white/10 bg-white/[0.02] text-center flicker-slow hover:border-white/30 transition-all cursor-default">
            <span className="text-xl font-['Bebas_Neue',sans-serif] tracking-[0.4em] text-white/60">
              DIORAMA / ENVIRONMENT
            </span>
          </div>
        </div>

        {/* Right Side: Projects Grid */}
        <div className="flex-1">
          {loadingProjects && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="aspect-[4/3] bg-white/5 border border-white/10 animate-pulse"></div>
              ))}
            </div>
          )}
          
          {projectsError && <p className="text-sm text-red-500">{projectsError}</p>}
          
          {!loadingProjects && !projectsError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              {filteredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="group relative flex flex-col gap-4"
                  style={{
                    animation: 'fadeInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 100}ms`,
                    opacity: 0
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-500 relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-60"></div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-2xl font-['Bebas_Neue',sans-serif] tracking-widest text-white/90 group-hover:text-white group-hover:flicker transition-all">
                      {project.title.toUpperCase()}
                    </h3>
                    <p className="text-xs text-white/40 tracking-[0.2em]">
                      {project.category} · {project.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Projects;