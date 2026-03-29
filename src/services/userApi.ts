/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

// Fungsi helper untuk mendapatkan header (Token)
const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const getUsersAPI = async () => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Gagal mengambil data user');
  return res.json();
};

export const createUserAPI = async (payload: any) => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Gagal menambah user');
  }
  return res.json();
};

export const updateUserAPI = async (id: number, payload: any) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Gagal memperbarui user');
  return res.json();
};

export const deleteUserAPI = async (id: number) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Gagal menghapus user');
  return res.json();
};