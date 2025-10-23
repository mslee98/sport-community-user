// 공통 타입 정의

export interface Site {
  id: string;
  name: string;
  description: string;
  rating: number;
  tier: number; // 1, 2, 3, 4, 5 등
  category: string;
  logo_url?: string;
  website_url: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  created_at: string;
}

