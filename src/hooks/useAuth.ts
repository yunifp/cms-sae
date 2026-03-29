/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // Untuk pesan sukses
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal melakukan login');
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message === 'Failed to fetch' ? 'Server tidak terhubung.' : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi 1: Kirim OTP ke Email
  const sendOtp = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password-send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengirim OTP');
      setMessage(data.message);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi 2: Verifikasi OTP & Reset Password
  const resetPassword = async (payload: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal reset password');
      setMessage(data.message);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    router.push('/admin/login'); 
  };

  return { login, logout, sendOtp, resetPassword, isLoading, error, message, setError, setMessage };
};