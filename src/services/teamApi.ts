const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const getTeamsAPI = async () => {
  const res = await fetch(`${API_URL}/teams`, { cache: 'no-store' });
  return res.json();
};