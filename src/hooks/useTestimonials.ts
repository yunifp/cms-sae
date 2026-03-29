/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/testimonials`);
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTestimonial = async (payload: any) => {
    try {
      const res = await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch { return false; }
  };

  const deleteTestimonial = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return res.ok;
    } catch { return false; }
  };

  return { testimonials, isLoading, fetchTestimonials, addTestimonial, deleteTestimonial };
};