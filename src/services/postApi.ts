const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const getPostsAPI = async () => {
  try {
    const res = await fetch(`${API_URL}/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};

export const getPostBySlugAPI = async (slug: string) => {
  try {
    const res = await fetch(`${API_URL}/posts/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};