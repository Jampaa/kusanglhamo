import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { getProjectById, getPublishedProjects } from '../api/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [projectError, setProjectError] = useState('');

  useEffect(() => {
    const loadProjectData = async () => {
      setLoadingProject(true);
      setProjectError('');
      try {
        const [projectsData, projectData] = await Promise.all([
          getPublishedProjects(),
          getProjectById(id),
        ]);
        setProjects(projectsData);
        setProject(projectData);
      } catch (error) {
        setProject(null);
        setProjectError(error.message || 'Failed to load project');
      } finally {
        setLoadingProject(false);
      }
    };
    loadProjectData();
  }, [id]);

  if (loadingProject) {
    return (
      <div className="min-h-screen bg-[#F5F1E8]">
        <Skeleton className="h-[70vh] w-full rounded-none" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-16 space-y-8">
          <Skeleton className="h-8 w-40" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-16 w-2/3" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project || projectError) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-4">{projectError || 'Project not found'}</h2>
          <Link to="/projects">
            <Button variant="outline">Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const processSteps = project.extraDetails || [];

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={project.hero}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1E8] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Back Button */}
        <Link to="/projects" className="inline-flex items-center text-[#2B2B2B]/60 hover:text-[#C1272D] transition-colors mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-[#C1272D] text-white">{project.category}</Badge>
              <span className="text-[#2B2B2B]/60">{project.year}</span>
            </div>
            <h1 className="text-6xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-[#2B2B2B]/80 mb-6 font-light leading-relaxed">
              {project.tagline}
            </p>
            <p className="text-base text-[#2B2B2B]/60 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Technical Details Sidebar */}
          <div className="bg-white rounded-sm p-8 shadow-md h-fit sticky top-24">
            <h3 className="text-sm font-semibold text-[#2B2B2B] tracking-wider mb-6 uppercase">Technical Details</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#2B2B2B]/60 mb-2 uppercase tracking-wider">Software</p>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((soft) => (
                    <span key={soft} className="text-sm bg-[#F5F1E8] px-3 py-1 rounded-full text-[#2B2B2B]">
                      {soft}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-[#2B2B2B]/60 mb-2 uppercase tracking-wider">Poly Count</p>
                <p className="text-sm text-[#2B2B2B] font-medium">{project.polycount}</p>
              </div>

              <div>
                <p className="text-xs text-[#2B2B2B]/60 mb-2 uppercase tracking-wider">Textures</p>
                <p className="text-sm text-[#2B2B2B] font-medium">{project.textures}</p>
              </div>

              <div>
                <p className="text-xs text-[#2B2B2B]/60 mb-2 uppercase tracking-wider">Rendering</p>
                <p className="text-sm text-[#2B2B2B] font-medium">{project.renderer}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Breakdown */}
        <div className="mb-16">
          <h2 className="text-4xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide mb-8">
            PROCESS BREAKDOWN
          </h2>
          
          <div className="space-y-16">
            {processSteps.length === 0 && (
              <p className="text-[#2B2B2B]/60">No process steps added yet.</p>
            )}
            {processSteps.map((step, index) => (
              <div key={`${step.title}-${index}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-sm shadow-lg group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#C1272D] text-white flex items-center justify-center font-bold">
                      {step.stepNumber}
                    </div>
                    <h3 className="text-2xl font-semibold text-[#2B2B2B]">{step.title}</h3>
                  </div>
                  <p className="text-[#2B2B2B]/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Viewer Callout */}
        <div className="bg-gradient-to-br from-[#C1272D]/10 to-[#D4AF37]/10 rounded-sm p-12 text-center mb-16">
          <h3 className="text-3xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] mb-4">
            INTERACTIVE 3D MODEL
          </h3>
          <p className="text-[#2B2B2B]/70 mb-6">Explore the full model in 3D viewer</p>
          {project.object3dUrl ? (
            <a href={project.object3dUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#C1272D] hover:bg-[#A01F25] text-white">
                Launch 3D Viewer
              </Button>
            </a>
          ) : (
            <Button disabled className="bg-[#C1272D] text-white opacity-70 cursor-not-allowed">
              3D Viewer Not Available
            </Button>
          )}
        </div>

        {/* Navigation */}
        {projects.length > 1 && (
        <div className="flex justify-between items-center border-t border-[#2B2B2B]/10 pt-12">
          <Link
            to={`/project/${prevProject.id}`}
            className="group flex items-center gap-4 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={24} className="text-[#C1272D] group-hover:-translate-x-2 transition-transform" />
            <div className="text-left">
              <p className="text-xs text-[#2B2B2B]/60 mb-1">Previous</p>
              <p className="text-lg font-semibold text-[#2B2B2B] group-hover:text-[#C1272D] transition-colors">
                {prevProject.title}
              </p>
            </div>
          </Link>

          <Link
            to={`/project/${nextProject.id}`}
            className="group flex items-center gap-4 hover:opacity-100 transition-opacity"
          >
            <div className="text-right">
              <p className="text-xs text-[#2B2B2B]/60 mb-1">Next</p>
              <p className="text-lg font-semibold text-[#2B2B2B] group-hover:text-[#C1272D] transition-colors">
                {nextProject.title}
              </p>
            </div>
            <ArrowRight size={24} className="text-[#C1272D] group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;