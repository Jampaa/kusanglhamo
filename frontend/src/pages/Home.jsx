import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { artist } from '../content/siteData';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { getPublishedProjects } from '../api/projects';
import { incrementPortfolioViews } from '../api/analytics';

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

    const viewTrackedThisSession = sessionStorage.getItem('portfolioViewTracked');
    if (!viewTrackedThisSession) {
      incrementPortfolioViews()
        .then(() => {
          sessionStorage.setItem('portfolioViewTracked', '1');
        })
        .catch(() => {
          // Ignore tracking failures to avoid blocking page rendering.
        });
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Empty dependency - only run once on mount

  return (
    <div className="min-h-screen bg-[#111] relative overflow-hidden">
      {/* Hero/Main Section */}
      <div className="min-h-screen relative flex items-center justify-center">
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
        </div>

        <section className="relative z-10 max-w-4xl w-full px-6 py-20 flex flex-col items-center text-center">
          {/* Main Logo */}
          <div className="w-32 h-32 lg:w-48 lg:h-48 mb-8 shake">
            <img src="/img/logo.png" alt="Kusang Lhamo" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
          </div>

          {/* Name and Title */}
          <div className="space-y-2 mb-8">
            <h1 className="text-5xl lg:text-8xl font-['Bebas_Neue',sans-serif] tracking-[0.2em] text-white">
              KUSANG LHAMO
            </h1>
            <p className="text-xl lg:text-2xl font-light text-white/60 tracking-widest italic">
              Game art student
            </p>
          </div>

          {/* Intro Text */}
          <div className="max-w-2xl mb-12">
            <p className="text-lg lg:text-xl text-white/80 font-light leading-relaxed tracking-wide">
              I enjoy creating immersive environments and game-ready assets, focusing on storytelling and clean 3D workflows.
            </p>
          </div>

          {/* Centered Navigation Icons (from sketch) */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-12">
            {[
              { path: '/', icon: '/img/home.png', label: 'Home' },
              { path: '/projects', icon: '/img/work.png', label: 'Work' },
              { path: '/about', icon: '/img/about.png', label: 'About' },
              { path: '/contact', icon: '/img/contact.png', label: 'Contact' }
            ].map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 border border-white/10 p-4 group-hover:border-white/40 transition-all duration-500 bg-white/5 rounded-sm flicker">
                  <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
                </div>
              </Link>
            ))}
          </div>

          {/* Footer line */}
          <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase">
            Still learning and building my journey in game art.
          </p>
        </section>
      </div>

      {/* Featured Projects Preview - Updated to Dark Theme */}
      <section className="py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-white/[0.02] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl lg:text-5xl font-['Bebas_Neue',sans-serif] text-white tracking-widest flicker">SELECTED WORK</h2>
              <p className="text-white/40 mt-2 text-sm lg:text-base tracking-wider uppercase">Recent projects and explorations</p>
            </div>
            <Link to="/projects">
              <Button variant="ghost" className="text-white/60 hover:text-white border border-white/10 hover:border-white/40 tracking-widest text-xs font-['Bebas_Neue',sans-serif]">
                VIEW ALL
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          {loadingProjects && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map((item) => (
                <div key={item} className="aspect-[4/3] bg-white/5 border border-white/10 animate-pulse"></div>
              ))}
            </div>
          )}
          {projectsError && (
            <p className="text-sm text-red-500">{projectsError}</p>
          )}
          {!loadingProjects && !projectsError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {projects.slice(0, 3).map((project, index) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="group relative overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-['Bebas_Neue',sans-serif] tracking-widest mb-1">{project.title.toUpperCase()}</h3>
                      <p className="text-[10px] text-white/60 tracking-widest uppercase">{project.category} · {project.year}</p>
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