/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const useServiceSettings = () => {
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk mengambil token dari localStorage
  const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // 1. Fetch data settings (Judul, Deskripsi, & JSON Stats)
  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/service-settings`);
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error("Gagal mengambil data service settings:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Update data settings
  const updateSettings = async (payload: { title: string; description: string; stats: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/service-settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch (err) {
      console.error("Gagal memperbarui service settings:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { settings, isLoading, fetchSettings, updateSettings };
};