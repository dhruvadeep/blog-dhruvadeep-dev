export interface Author {
  name: string;
  avatar: string;
}

export interface FeaturedPost {
  id: number;
  slug?: string;
  title: string;
  excerpt: string;
  author: Author;
  date: string;
  tags: string[];
  image: string;
}

export interface Post {
  id: number;
  slug?: string;
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
  slug?: string;
  title: string;
  date: string;
  image: string;
}
