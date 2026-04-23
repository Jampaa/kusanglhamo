import React from 'react';
import { Input } from '../components/ui/input';

const ProjectTechnicalDetails = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#2B2B2B] border-b pb-2">Technical Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Software (comma-separated) *
          </label>
          <Input
            value={formData.software}
            onChange={(e) => setFormData({...formData, software: e.target.value})}
            placeholder="3ds Max, ZBrush, Substance Painter"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Poly Count
          </label>
          <Input
            value={formData.polycount}
            onChange={(e) => setFormData({...formData, polycount: e.target.value})}
            placeholder="e.g., 45,000 tris"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Textures
          </label>
          <Input
            value={formData.textures}
            onChange={(e) => setFormData({...formData, textures: e.target.value})}
            placeholder="e.g., 4K PBR"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Renderer
          </label>
          <Input
            value={formData.renderer}
            onChange={(e) => setFormData({...formData, renderer: e.target.value})}
            placeholder="e.g., Unreal Engine 5"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTechnicalDetails;
