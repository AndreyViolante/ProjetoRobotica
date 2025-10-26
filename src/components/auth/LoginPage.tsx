import { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { User } from '../../types';
import { MOCK_USERS } from '../../data/mockData';
import { RobotIcon } from '../common/RobotIcon';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <RobotIcon />
        </div>
        <h1 className="text-4xl font-black text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Portal de Robótica
        </h1>
        <p className="text-center text-gray-700 font-semibold mb-1">E.M João da Silva Bezerra</p>
        <p className="text-center text-gray-500 text-sm mb-8 flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-yellow-500" />
          Mostre seus projetos incríveis!
          <Sparkles size={16} className="text-yellow-500" />
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
              placeholder="Digite seu usuário"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
              placeholder="Digite sua senha"
            />
          </div>
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            </div>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Zap size={20} />
            Entrar
          </button>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-purple-100">
          <p className="font-bold mb-2 text-gray-700">👥 Usuários de teste:</p>
          <p className="text-gray-600 text-sm"><strong>Professor:</strong> professor / admin123</p>
          <p className="text-gray-600 text-sm"><strong>Aluno:</strong> aluno1 / 123</p>
        </div>
      </div>
    </div>
  );
}