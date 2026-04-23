import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="flex items-center gap-4 p-4 border border-[#2B2B2B]/10 rounded-lg hover:border-[#C1272D]/30 transition-colors">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-[#2B2B2B] text-lg">{project.title}</h3>
        <p className="text-sm text-[#2B2B2B]/60">{project.category} · {project.year}</p>
        <p className="text-xs mt-1">
          <span className={`px-2 py-1 rounded-full ${project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {project.status === 'published' ? 'Published' : 'On Hold'}
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        <Link to={`/admin/projects/edit/${project.id}`}>
          <Button variant="outline" size="sm" className="border-[#0080C0] text-[#0080C0] hover:bg-[#0080C0] hover:text-white">
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 size={16} className="mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
