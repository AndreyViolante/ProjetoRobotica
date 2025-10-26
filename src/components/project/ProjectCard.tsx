import { Edit2, Trash2, Users, Award } from 'lucide-react';
import { Project, User } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  currentUser: User;
}

export function ProjectCard({ project, onClick, onEdit, onDelete, currentUser }: ProjectCardProps) {
  const fitClass = project.coverImageFit === 'contain' ? 'object-contain bg-gray-100' : 'object-cover';
  
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group border-2 border-transparent hover:border-purple-300"
    >
      <div className="aspect-square w-full overflow-hidden relative">
        <img
          src={project.coverImage}
          alt={project.title}
          className={`w-full h-full ${fitClass} group-hover:scale-110 transition-transform duration-500`}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users size={18} className="text-purple-600" />
          </div>
          <span className="text-sm font-bold text-purple-600">{project.teamName}</span>
        </div>
        <h3 className="text-2xl font-black text-gray-800 mb-3">{project.title}</h3>
        <p className="text-gray-600">{project.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Award size={16} className="text-yellow-500" />
            <span className="font-semibold">{project.authorName}</span>
          </div>
          {currentUser.role === 'admin' && (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onEdit}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:scale-110 transition-all"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => window.confirm('Excluir?') && onDelete()}
                className="p-2 bg-red-100 text-red-600 rounded-lg hover:scale-110 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}