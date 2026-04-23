import React from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Upload } from 'lucide-react';

const ProjectImageUpload = ({ formData, setFormData, onImageUpload }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#2B2B2B] border-b pb-2">Images</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Thumbnail Image URL *
          </label>
          <div className="flex gap-2">
            <Input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
              placeholder="https://example.com/image.jpg"
              required
            />
            <Button
              type="button"
              onClick={() => onImageUpload('thumbnail')}
              variant="outline"
              size="icon"
            >
              <Upload size={20} />
            </Button>
          </div>
          <p className="text-xs text-[#2B2B2B]/60 mt-1">Recommended ratio: 4:3</p>
          {formData.thumbnail && (
            <div className="mt-2 aspect-[4/3] w-full rounded overflow-hidden bg-[#F5F1E8]">
              <img src={formData.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
            Hero Image URL *
          </label>
          <div className="flex gap-2">
            <Input
              type="url"
              value={formData.hero}
              onChange={(e) => setFormData({...formData, hero: e.target.value})}
              placeholder="https://example.com/hero.jpg"
              required
            />
            <Button
              type="button"
              onClick={() => onImageUpload('hero')}
              variant="outline"
              size="icon"
            >
              <Upload size={20} />
            </Button>
          </div>
          <p className="text-xs text-[#2B2B2B]/60 mt-1">Recommended ratio: 16:9</p>
          {formData.hero && (
            <div className="mt-2 aspect-video w-full rounded overflow-hidden bg-[#F5F1E8]">
              <img src={formData.hero} alt="Hero preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectImageUpload;
