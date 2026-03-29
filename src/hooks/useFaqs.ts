/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const useFaqs = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchFaqs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/faqs`);
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createFaq = async (payload: { question: string; answer: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/faqs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch { return false; } 
    finally { setIsLoading(false); }
  };

  const updateFaq = async (id: number, payload: { question: string; answer: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/faqs/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch { return false; } 
    finally { setIsLoading(false); }
  };

  const deleteFaq = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/faqs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return res.ok;
    } catch { return false; }
  };

  return { faqs, isLoading, fetchFaqs, createFaq, updateFaq, deleteFaq };
};