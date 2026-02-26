// Central location for all blog metadata
export interface Blog {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
}

export const blogs: Blog[] = [
  {
    slug: 'polyterminator',
    title: 'The PolyTerminator Project',
    description: 'Winning Polytopia with data and AI',
    date: '2025-12-26',
    published: true,
  },
  {
    slug: 'polyterminal',
    title: 'PolyTerminal',
    description: 'To play or not to play, data is the answer',
    date: '2026-02-01',
    published: false,
  },
  // Add more blogs here as you create them
];

// Helper function to get a blog by slug
export const getBlogBySlug = (slug: string): Blog | undefined => {
  return blogs.find((blog) => blog.slug === slug && blog.published);
};

// Helper function to get all published blogs sorted by date (newest first)
export const getAllPublishedBlogs = (): Blog[] => {
  return blogs
    .filter((blog) => blog.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
