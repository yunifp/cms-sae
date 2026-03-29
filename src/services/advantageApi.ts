const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const getAdvantageSettingsAPI = async () => {
  try {
    const res = await fetch(`${API_URL}/advantage-settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};