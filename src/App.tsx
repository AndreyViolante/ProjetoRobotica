import { Search, Bot } from 'lucide-react';
import { Project, User } from '../src/types';
import { ProjectCard } from '../src/components/project/ProjectCard';

interface HomeViewProps {
  projects: Project[];
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onViewProject: (p: Project) => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  currentUser: User;
}

export function HomeView({
  projects,
  searchTerm,
  setSearchTerm,
  onViewProject,
  onEdit,
  onDelete,
  currentUser,
}: HomeViewProps) {
  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-4 text-purple-400" size={24} />
          <input
            type="text"
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all text-lg shadow-lg"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Bot size={80} className="mx-auto text-purple-300 mb-6" />
          <p className="text-gray-500 text-xl font-bold">Nenhum projeto encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={() => onViewProject(p)}
              onEdit={() => onEdit(p)}
              onDelete={() => onDelete(p.id)}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}