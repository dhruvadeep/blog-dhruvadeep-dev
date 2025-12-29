-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Authors Table
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    avatar TEXT,
    email TEXT UNIQUE
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    author_id INTEGER,
    category_id INTEGER,
    read_time TEXT,
    published BOOLEAN DEFAULT 0,
    is_featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tags Table
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Post Tags Junction Table
CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Images Table (for Tiptap uploads)
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    data BLOB NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    views INTEGER DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Seed Data
INSERT OR IGNORE INTO authors (name, avatar) VALUES 
('Dhruvadeep Malakar', 'https://media.licdn.com/dms/image/v2/D5603AQGa8M6K-KDkbA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1720429026541?e=1767830400&v=beta&t=8me0eSd47Ega5n-bIWTb38gSVOKCPJY6_jR-lbg1QwY'),
('Kaori Miyazono', 'https://randomuser.me/api/portraits/women/1.jpg'),
('Oarack Babama', 'https://randomuser.me/api/portraits/men/1.jpg'),
('John Doe', 'https://randomuser.me/api/portraits/men/2.jpg'),
('Jane Smith', 'https://randomuser.me/api/portraits/women/2.jpg');

INSERT OR IGNORE INTO categories (name) VALUES 
('Web Development'), ('Design System'), ('Python'), ('UI/UX Design'), ('Machine Learning'), ('Algorithm'), ('Development');

INSERT OR IGNORE INTO tags (name) VALUES 
('AI'), ('Productivity'), ('Minimalism'), ('React'), ('CSS'), ('Lifestyle');

-- Seed Posts (Using dummy content for now)
INSERT OR IGNORE INTO posts (title, slug, excerpt, content, cover_image, author_id, category_id, read_time, published, created_at) VALUES 
('Email is decentralized, which means I can quit Gmail anytime soon', 'email-is-decentralized', 'To get started, email, the backbone of modern communication, is a decentralized platform.', '<h1>Email is decentralized</h1><p>Full content here...</p>', 'https://media.licdn.com/dms/image/v2/D5622AQHFdsQLIvTSGQ/feedshare-shrink_1280/feedshare-shrink_1280/0/1720435854623?e=1767830400&v=beta&t=vD3LDUGhfexkl32tKhUCz3vWxm5dc2kOWFlDHn9tivY', 1, 1, '5min read', 1, '2025-12-21 10:00:00'),
('Minimalism is dead, long live clutter', 'minimalism-is-dead', 'Why clean desks are a sign of a sick mind. Embrace the chaos.', '<p>Content about minimalism...</p>', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800', 2, 4, '5min read', 1, '2025-06-24 10:00:00'),
('The psychology of rounded corners', 'psychology-of-rounded-corners', 'Why 4px radius makes users trust you more than 2px.', '<p>Content about rounded corners...</p>', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', 3, 5, '8min read', 1, '2025-06-22 10:00:00'),
('Building abstract architectures', 'building-abstract-architectures', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '<p>Content about architecture...</p>', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', 4, 6, '3min read', 1, '2025-06-20 10:00:00'),
('CSS Variables: The silent heroes', 'css-variables-silent-heroes', 'Stop hardcoding hex values. It''s 2025, please.', '<p>Content about CSS variables...</p>', 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800', 5, 7, '6min read', 1, '2025-06-19 10:00:00');

-- Seed Analytics
INSERT OR IGNORE INTO analytics (post_id, views) VALUES 
(1, 120), (2, 45), (3, 89), (4, 12), (5, 230);
