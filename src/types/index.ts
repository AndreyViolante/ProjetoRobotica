export interface User {
  id: string;
  username: string;
  name: string;
  password: string;
  role: 'student' | 'admin';
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  data: string;
  fit?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  teamName: string;
  description: string;
  coverImage: string;
  coverImageFit?: string;
  gallery: MediaItem[];
  authorId: string;
  authorName: string;
  createdAt: string;
}