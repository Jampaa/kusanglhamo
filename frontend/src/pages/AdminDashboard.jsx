import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PrayerFlagBar } from '../components/TibetanDecorations';
import { LayoutDashboard, Briefcase, User, Mail, LogOut, Plus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import ProjectCard from '../components/ProjectCard';
import { Skeleton } from '../components/ui/skeleton';
import { deleteProject, getAdminProjects } from '../api/projects';
import { getAdminMe, logoutAdmin } from '../api/auth';
import { getAdminMessages } from '../api/contact';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    views: 0,
    messages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadAdminProjects = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        await getAdminMe();
        const [projectsData, messagesData] = await Promise.all([
          getAdminProjects(),
          getAdminMessages(),
        ]);
        setProjects(projectsData);
        setStats({
          totalProjects: projectsData.length,
          views: 0,
          messages: messagesData.length,
        });
      } catch (error) {
        logoutAdmin();
        setErrorMessage(error.message || 'Failed to load admin data');
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };
    loadAdminProjects();
  }, [navigate]);

  const handleLogout = useCallback(() => {
    logoutAdmin();
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate('/');
  }, [navigate, toast]);

  const handleDeleteProject = useCallback(async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        const updatedProjects = projects.filter(p => p.id !== projectId);
        setProjects(updatedProjects);
        setStats(prev => ({ ...prev, totalProjects: updatedProjects.length }));
        toast({
          title: "Project deleted",
          description: "Project has been removed successfully.",
        });
      } catch (error) {
        toast({
          title: "Delete failed",
          description: error.message || "Unable to delete project.",
          variant: "destructive",
        });
      }
    }
  }, [projects, toast]);

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Admin Header */}
      <header className="bg-[#3A3A3A] text-white shadow-lg sticky top-0 z-40">
        <PrayerFlagBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LayoutDashboard size={24} />
              <div>
                <h1 className="text-xl font-['Bebas_Neue',sans-serif] tracking-wide">
                  ADMIN DASHBOARD
                </h1>
                <p className="text-xs text-white/70">Welcome back, Kusang!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/projects">
                <Button variant="ghost" className="text-white hover:text-[#C1272D]">
                  View 3D Objects
                </Button>
              </Link>
              <Link to="/admin/messages">
                <Button variant="ghost" className="text-white hover:text-[#C1272D]">
                  View Messages
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" className="text-white hover:text-[#C1272D]">
                  View Site
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white hover:text-[#C1272D]"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#C1272D]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2B2B2B]/60 mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-[#2B2B2B]">{stats.totalProjects}</p>
              </div>
              <div className="w-12 h-12 bg-[#C1272D]/10 rounded-full flex items-center justify-center">
                <Briefcase size={24} className="text-[#C1272D]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#00A651]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2B2B2B]/60 mb-1">Portfolio Views</p>
                <p className="text-3xl font-bold text-[#2B2B2B]">{stats.views}</p>
              </div>
              <div className="w-12 h-12 bg-[#00A651]/10 rounded-full flex items-center justify-center">
                <User size={24} className="text-[#00A651]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#0080C0]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2B2B2B]/60 mb-1">Messages</p>
                <p className="text-3xl font-bold text-[#2B2B2B]">{stats.messages}</p>
                <Link to="/admin/messages" className="text-xs text-[#0080C0] hover:text-[#005b88]">
                  Open inbox
                </Link>
              </div>
              <div className="w-12 h-12 bg-[#0080C0]/10 rounded-full flex items-center justify-center">
                <Mail size={24} className="text-[#0080C0]" />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-['Bebas_Neue',sans-serif] text-[#2B2B2B] tracking-wide">
              MANAGE PROJECTS
            </h2>
            <Link to="/admin/projects/new">
              <Button className="bg-[#C1272D] hover:bg-[#A01F25] text-white">
                <Plus size={20} className="mr-2" />
                Add New Project
              </Button>
            </Link>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {isLoading && (
              <div className="space-y-4">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="border border-[#2B2B2B]/10 rounded-md p-4 space-y-3">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))}
              </div>
            )}
            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
