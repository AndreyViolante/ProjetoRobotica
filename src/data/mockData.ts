import { User, Project } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', username: 'professor', name: 'Professor', password: 'admin123', role: 'admin' },
  { id: '2', username: 'aluno1', name: 'João Silva', password: '123', role: 'student' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Robô Seguidor de Linha',
    teamName: 'Equipe Alpha',
    description: 'Um robô autônomo que segue linhas pretas usando sensores infravermelhos.',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    coverImageFit: 'cover',
    gallery: [],
    authorId: '2',
    authorName: 'Gedon',
    createdAt: '2024-10-15',
  },
];