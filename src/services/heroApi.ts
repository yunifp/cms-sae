const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const getHeroSettingsAPI = async () => {
  try {
    const res = await fetch(`${API_URL}/hero-settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};