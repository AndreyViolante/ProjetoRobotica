import { useState, useEffect } from 'react';
import { User, Project } from './types';
import { INITIAL_PROJECTS } from './data/mockData';
import { LoginPage } from './components/auth/LoginPage';
import { Navbar } from './components/layout/Navbar';
import { HomeView } from './pages/HomeView';
import { ProjectForm } from './components/project/ProjectForm';
import { ProjectDetails } from './components/project/ProjectDetails';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'home' | 'publish' | 'edit' | 'details'>('home');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(INITIAL_PROJECTS);
  }, []);

  if (!currentUser) {
    return <LoginPage onLogin={setCurrentUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar
        user={currentUser}
        onLogout={() => setCurrentUser(null)}
        onPublish={() => setActiveView('publish')}
      />
      
      {activeView === 'home' && (
        <HomeView
          projects={projects}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onViewProject={(p) => {
            setViewingProject(p);
            setActiveView('details');
          }}
          onEdit={(p) => {
            setEditingProject(p);
            setActiveView('edit');
          }}
          onDelete={(id) => setProjects(projects.filter((p) => p.id !== id))}
          currentUser={currentUser}
        />
      )}
      
      {activeView === 'publish' && (
        <ProjectForm
          onCancel={() => setActiveView('home')}
          onSave={(p) => {
            setProjects([...projects, p]);
            setActiveView('home');
          }}
          currentUser={currentUser}
        />
      )}
      
      {activeView === 'edit' && editingProject && (
        <ProjectForm
          isEdit
          project={editingProject}
          onCancel={() => {
            setEditingProject(null);
            setActiveView('home');
          }}
          onSave={(p) => {
            setProjects(projects.map((pr) => (pr.id === p.id ? p : pr)));
            setEditingProject(null);
            setActiveView('home');
          }}
          currentUser={currentUser}
        />
      )}
      
      {activeView === 'details' && viewingProject && (
        <ProjectDetails
          project={viewingProject}
          onBack={() => {
            setViewingProject(null);
            setActiveView('home');
          }}
          onEdit={(p) => {
            setEditingProject(p);
            setActiveView('edit');
          }}
          onDelete={(id) => {
            setProjects(projects.filter((p) => p.id !== id));
            setViewingProject(null);
            setActiveView('home');
          }}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}