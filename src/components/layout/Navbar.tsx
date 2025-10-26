import { LogOut, Plus } from 'lucide-react';
import { User } from '../../types';
import { RobotIcon } from '../common/RobotIcon';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onPublish: () => void;
}

export function Navbar({ user, onLogout, onPublish }: NavbarProps) {
  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-xl border-b-2 border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RobotIcon />
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portal de Robótica
            </h1>
            <p className="text-sm text-gray-600">E.M João da Silva Bezerra • {user.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user.role === 'student' && (
            <button
              onClick={onPublish}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
            >
              <Plus size={20} />
              Publicar
            </button>
          )}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}