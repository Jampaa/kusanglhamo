import React from 'react';
import { Input } from '../components/ui/input';

const ProjectBasicInfo = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#2B2B2B] border-b pb-2">Basic Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Project Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="e.g., Temple Environment"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Category *
          </label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            placeholder="e.g., Environment, 3D Art"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Year *
          </label>
          <Input
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
            placeholder="2025"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectBasicInfo;
