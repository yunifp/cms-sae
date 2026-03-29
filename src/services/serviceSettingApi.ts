const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const getServiceSettingsAPI = async () => {
  try {
    const res = await fetch(`${API_URL}/service-settings`, { 
      cache: 'no-store' // Penting agar data selalu fresh saat diubah di admin
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching service settings:", error);
    return null;
  }
};