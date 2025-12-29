export interface Author {
  name: string;
  avatar: string;
}

export interface FeaturedPost {
  id: number;
  title: string;
  excerpt: string;
  author: Author;
  date: string;
  tags: string[];
  image: string;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface RecentInsight {
  id: number;
  title: string;
  date: string;
  image: string;
}
