import { useState } from 'react';
import { Bot, Camera, Video, Trash2 } from 'lucide-react';
import { Project, MediaItem, User } from '../../types';
import { handleFileUpload } from '../../utils/fileUpload';

interface ProjectFormProps {
  isEdit?: boolean;
  project?: Project;
  onCancel: () => void;
  onSave: (p: Project) => void;
  currentUser: User;
}

export function ProjectForm({ isEdit, project, onCancel, onSave, currentUser }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || '');
  const [teamName, setTeamName] = useState(project?.teamName || '');
  const [desc, setDesc] = useState(project?.description || '');
  const [cover, setCover] = useState(project?.coverImage || '');
  const [coverFit, setCoverFit] = useState(project?.coverImageFit || 'cover');
  const [gallery, setGallery] = useState<MediaItem[]>(project?.gallery || []);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileUpload(file, 5 * 1024 * 1024, setCover);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const maxSize = type === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
      handleFileUpload(file, maxSize, (data) => {
        setGallery(prev => [...prev, {
          id: Date.now().toString() + Math.random(),
          type,
          data,
          fit: 'cover',
          description: '',
        }]);
      });
    });
  };

  const updateFit = (id: string, fit: string) => {
    setGallery(prev => prev.map(item => item.id === id ? { ...item, fit } : item));
  };

  const updateDescription = (id: string, description: string) => {
    setGallery(prev => prev.map(item => item.id === id ? { ...item, description } : item));
  };

  const removeItem = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (!title || !teamName || !desc || !cover) {
      alert('Preencha todos os campos!');
      return;
    }
    
    const newProject: Project = {
      id: project?.id || Date.now().toString(),
      title,
      teamName,
      description: desc,
      coverImage: cover,
      coverImageFit: coverFit,
      gallery,
      authorId: currentUser.id,
      authorName: currentUser.name,
      createdAt: project?.createdAt || new Date().toISOString().split('T')[0],
    };
    
    onSave(newProject);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
        <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          {isEdit ? '✏️ Editar' : '✨ Publicar Projeto'}
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 transition-all"
              placeholder="Ex: Robô Seguidor de Linha"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Equipe/Aluno *</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 transition-all"
              placeholder="Ex: Equipe Alpha"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Descrição *</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 transition-all resize-none"
              placeholder="Descreva..."
            />
          </div>
          
          <div className="border-t-2 border-purple-100 pt-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">📸 Foto de Capa *</label>
            <div className="border-2 border-dashed border-purple-300 rounded-2xl p-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
                id="cover-upload"
              />
              <label htmlFor="cover-upload" className="cursor-pointer">
                {cover ? (
                  <div>
                    <div className={`w-full h-80 flex items-center justify-center rounded-xl mb-4 overflow-hidden ${coverFit === 'contain' ? 'bg-gradient-to-br from-purple-50 to-blue-50' : ''}`}>
                      <img
                        src={cover}
                        alt="Capa"
                        className={`max-w-full max-h-80 rounded-xl ${
                          coverFit === 'cover' ? 'w-full h-80 object-cover' :
                          coverFit === 'contain' ? 'object-contain' :
                          'w-full h-80 object-fill'
                        }`}
                      />
                    </div>
                    <div className="flex gap-3 justify-center">
                      {['cover', 'contain', 'fill'].map(fit => (
                        <button
                          key={fit}
                          type="button"
                          onClick={(e) => { e.preventDefault(); setCoverFit(fit); }}
                          className={`px-6 py-2 rounded-xl font-bold transition-all ${
                            coverFit === fit
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {fit === 'cover' ? 'Preencher' : fit === 'contain' ? 'Ajustar' : 'Esticar'}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <Bot size={64} className="mx-auto text-purple-300 mb-4" />
                    <p className="text-lg font-bold text-gray-600">Clique para enviar</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="border-t-2 border-purple-100 pt-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">🎬 Galeria</label>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border-2 border-dashed rounded-xl p-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleGalleryUpload(e, 'image')}
                  className="hidden"
                  id="gallery-images"
                />
                <label htmlFor="gallery-images" className="cursor-pointer block py-6 text-center">
                  <Camera size={32} className="mx-auto text-blue-500 mb-2" />
                  <p className="text-sm font-bold">Adicionar Fotos</p>
                </label>
              </div>

              <div className="border-2 border-dashed rounded-xl p-4">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleGalleryUpload(e, 'video')}
                  className="hidden"
                  id="gallery-videos"
                />
                <label htmlFor="gallery-videos" className="cursor-pointer block py-6 text-center">
                  <Video size={32} className="mx-auto text-purple-500 mb-2" />
                  <p className="text-sm font-bold">Adicionar Vídeos</p>
                </label>
              </div>
            </div>

            {gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((item) => {
                  const itemFit = item.fit === 'contain' ? 'object-contain bg-gray-100' : 'object-cover';
                  return (
                    <div key={item.id} className="border-2 rounded-xl overflow-hidden">
                      <div className="relative group">
                        <div className="aspect-square bg-black">
                          {item.type === 'image' ? (
                            <img src={item.data} alt="Galeria" className={`w-full h-full ${itemFit}`} />
                          ) : (
                            <video src={item.data} className="w-full h-full object-contain" />
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                        {item.type === 'image' && (
                          <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={() => updateFit(item.id, 'cover')}
                              className={`flex-1 px-3 py-1 text-xs rounded ${
                                item.fit === 'cover' ? 'bg-blue-500 text-white' : 'bg-white'
                              }`}
                            >
                              Preencher
                            </button>
                            <button
                              onClick={() => updateFit(item.id, 'contain')}
                              className={`flex-1 px-3 py-1 text-xs rounded ${
                                item.fit === 'contain' ? 'bg-blue-500 text-white' : 'bg-white'
                              }`}
                            >
                              Ajustar
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-gray-50">
                        <textarea
                          value={item.description || ''}
                          onChange={(e) => updateDescription(item.id, e.target.value)}
                          placeholder="Adicione uma descrição..."
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 resize-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
            >
              {isEdit ? 'Salvar' : 'Publicar'}
            </button>
            <button
              onClick={onCancel}
              className="px-8 bg-gray-200 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}