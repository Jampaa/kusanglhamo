import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { PrayerFlagBar } from '../components/TibetanDecorations';
import { ArrowLeft, Save, X } from 'lucide-react';
import ProjectBasicInfo from '../components/ProjectBasicInfo';
import ProjectImageUpload from '../components/ProjectImageUpload';
import ProjectTechnicalDetails from '../components/ProjectTechnicalDetails';
import { createProject, getAdminProjects, updateProject } from '../api/projects';
import { getAdminMe } from '../api/auth';

const AdminProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    year: new Date().getFullYear().toString(),
    thumbnail: '',
    hero: '',
    tagline: '',
    overview: '',
    software: '',
    polycount: '',
    textures: '',
    renderer: '',
    object3dUrl: '',
    status: 'published',
    extraDetails: [
      { stepNumber: 1, title: '', description: '', image: '' }
    ]
  });
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = useCallback((field) => {
    // In a real app, this would upload to a server
    // For now, we'll use a URL input
    const url = prompt(`Enter image URL for ${field}:`);
    if (url) {
      setFormData(prev => ({ ...prev, [field]: url }));
    }
  }, []);

  useEffect(() => {
    const loadProject = async () => {
      try {
        await getAdminMe();
        if (!isEditMode) {
          return;
        }
        setIsLoading(true);
        const projects = await getAdminProjects();
        const project = projects.find((item) => item.id === id);
        if (!project) {
          toast({
            title: 'Project not found',
            description: 'The selected project does not exist.',
            variant: 'destructive',
          });
          navigate('/admin/dashboard');
          return;
        }
        setFormData({
          title: project.title,
          category: project.category,
          year: project.year,
          thumbnail: project.thumbnail,
          hero: project.hero,
          tagline: project.tagline,
          overview: project.overview,
          software: project.software.join(', '),
          polycount: project.polycount || '',
          textures: project.textures || '',
          renderer: project.renderer || '',
          object3dUrl: project.object3dUrl || '',
          status: project.status || 'published',
          extraDetails: project.extraDetails?.length
            ? project.extraDetails
            : [{ stepNumber: 1, title: '', description: '', image: '' }],
        });
      } catch (error) {
        toast({
          title: 'Authentication error',
          description: error.message || 'Please login again.',
          variant: 'destructive',
        });
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };
    loadProject();
  }, [id, isEditMode, navigate, toast]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const projectData = {
      title: formData.title,
      category: formData.category,
      year: formData.year,
      thumbnail: formData.thumbnail,
      hero: formData.hero,
      tagline: formData.tagline,
      overview: formData.overview,
      software: formData.software.split(',').map((s) => s.trim()).filter(Boolean),
      polycount: formData.polycount,
      textures: formData.textures,
      renderer: formData.renderer,
      object3dUrl: formData.object3dUrl,
      status: formData.status,
      extraDetails: formData.extraDetails
        .filter((step) => step.title || step.description || step.image)
        .map((step, index) => ({
          stepNumber: Number(step.stepNumber) || index + 1,
          title: step.title,
          description: step.description,
          image: step.image,
        })),
    };

    try {
      if (isEditMode) {
        await updateProject(id, projectData);
      } else {
        await createProject(projectData);
      }
      toast({
        title: isEditMode ? "Project Updated!" : "Project Added!",
        description: `${formData.title} has been ${isEditMode ? 'updated' : 'added'} successfully.`,
      });
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: 'Save failed',
        description: error.message || 'Unable to save project.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isEditMode, id, navigate, toast]);

  const addExtraDetail = () => {
    setFormData((prev) => ({
      ...prev,
      extraDetails: [
        ...prev.extraDetails,
        {
          stepNumber: prev.extraDetails.length + 1,
          title: '',
          description: '',
          image: '',
        },
      ],
    }));
  };

  const removeExtraDetail = (indexToRemove) => {
    setFormData((prev) => {
      const filtered = prev.extraDetails.filter((_, index) => index !== indexToRemove);
      return {
        ...prev,
        extraDetails: filtered.length
          ? filtered.map((step, index) => ({ ...step, stepNumber: index + 1 }))
          : [{ stepNumber: 1, title: '', description: '', image: '' }],
      };
    });
  };

  const updateExtraDetail = (indexToUpdate, field, value) => {
    setFormData((prev) => ({
      ...prev,
      extraDetails: prev.extraDetails.map((step, index) =>
        index === indexToUpdate ? { ...step, [field]: value } : step
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header */}
      <header className="bg-[#3A3A3A] text-white shadow-lg sticky top-0 z-40">
        <PrayerFlagBar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-['Bebas_Neue',sans-serif] tracking-wide">
              {isEditMode ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}
            </h1>
            <Button
              onClick={() => navigate('/admin/dashboard')}
              variant="ghost"
              className="text-white hover:text-[#C1272D]"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-6 lg:p-8">
            <p className="text-[#2B2B2B]/60">Loading project data...</p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 lg:p-8 space-y-6">
          {/* Basic Info Component */}
          <ProjectBasicInfo formData={formData} setFormData={setFormData} />

          {/* Image Upload Component */}
          <ProjectImageUpload 
            formData={formData} 
            setFormData={setFormData}
            onImageUpload={handleImageUpload}
          />

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#2B2B2B] border-b pb-2">Description</h2>
            
            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                Tagline *
              </label>
              <Input
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                placeholder="A short, catchy description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                Overview *
              </label>
              <Textarea
                value={formData.overview}
                onChange={(e) => setFormData({...formData, overview: e.target.value})}
                placeholder="Detailed project description..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Technical Details Component */}
          <ProjectTechnicalDetails formData={formData} setFormData={setFormData} />

          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
              3D Object URL (optional)
            </label>
            <Input
              type="url"
              value={formData.object3dUrl}
              onChange={(e) => setFormData({ ...formData, object3dUrl: e.target.value })}
              placeholder="https://sketchfab.com/models/..."
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#2B2B2B] border-b pb-2">Publishing</h2>
            <div>
              <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                required
              >
                <option value="published">Published</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-xl font-semibold text-[#2B2B2B]">Extra Details (Process Breakdown)</h2>
              <Button type="button" variant="outline" onClick={addExtraDetail}>Add Step</Button>
            </div>
            {formData.extraDetails.map((step, index) => (
              <div key={`${step.stepNumber}-${index}`} className="border rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#2B2B2B]">Step {index + 1}</p>
                  <Button type="button" variant="ghost" onClick={() => removeExtraDetail(index)}>Remove</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={step.title}
                    onChange={(e) => updateExtraDetail(index, 'title', e.target.value)}
                    placeholder="Step title (e.g., High Poly)"
                  />
                  <Input
                    type="url"
                    value={step.image}
                    onChange={(e) => updateExtraDetail(index, 'image', e.target.value)}
                    placeholder="Step image URL"
                  />
                </div>
                <Textarea
                  value={step.description}
                  onChange={(e) => updateExtraDetail(index, 'description', e.target.value)}
                  placeholder="Step description"
                  rows={3}
                />
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#C1272D] hover:bg-[#A01F25] text-white py-6"
            >
              <Save size={20} className="mr-2" />
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
              className="px-8"
            >
              <X size={20} className="mr-2" />
              Cancel
            </Button>
          </div>
        </form>
        )}
      </main>
    </div>
  );
};

export default AdminProjectForm;
