import { Users, Award, Sparkles, Zap, Edit2, Trash2 } from 'lucide-react';
import { Project, User } from '../../types';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  currentUser: User;
}

export function ProjectDetails({ project, onBack, onEdit, onDelete, currentUser }: ProjectDetailsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-purple-600 font-bold text-lg hover:gap-4 transition-all"
      >
        ← Voltar
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-100">
        <div className="relative h-96">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Users size={24} />
              <span className="text-xl font-bold">{project.teamName}</span>
            </div>
            <h1 className="text-5xl font-black mb-4">{project.title}</h1>
            <div className="flex items-center gap-2">
              <Award size={18} className="text-yellow-400" />
              <span className="font-semibold">{project.authorName}</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-black text-gray-800 mb-4 flex items-center gap-3">
            <Sparkles className="text-purple-500" />
            Sobre o Projeto
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border-2 border-purple-100 mb-8">
            {project.description}
          </p>

          {project.gallery.length > 0 && (
            <div>
              <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <Zap className="text-yellow-500" />
                Galeria
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((item) => {
                  const fitClass = item.fit === 'contain' ? 'object-contain bg-gray-100' : 'object-cover';
                  
                  return (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-purple-100">
                      <div className="aspect-square bg-black">
                        {item.type === 'image' ? (
                          <img src={item.data} alt="Foto" className={`w-full h-full ${fitClass}`} />
                        ) : (
                          <video src={item.data} controls className="w-full h-full object-contain" />
                        )}
                      </div>
                      {item.description && (
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                          <p className="text-sm text-gray-700">{item.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentUser.role === 'admin' && (
            <div className="mt-8 pt-8 border-t-2 border-purple-100 flex gap-4">
              <button
                onClick={() => onEdit(project)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
              >
                <Edit2 size={20} />
                Editar
              </button>
              <button
                onClick={() => window.confirm('Excluir?') && onDelete(project.id)}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
              >
                <Trash2 size={20} />
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}