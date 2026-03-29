/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const useDashboard = () => {
  const [statsData, setStatsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const fetchDashboardStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/dashboard/stats`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error('Gagal mengambil data statistik');
      }

      const data = await res.json();
      setStatsData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { 
    statsData, 
    isLoading, 
    error, 
    fetchDashboardStats 
  };
};