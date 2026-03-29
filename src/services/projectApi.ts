const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const getProjectsAPI = async () => {
  try {
    const res = await fetch(`${API_URL}/projects`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};

export const getProjectByIdAPI = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};