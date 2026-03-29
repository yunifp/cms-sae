/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const useContactSettings = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContactSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/contact-settings`);
      const data = await res.json();
      setContactData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateContactSettings = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/contact-settings`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      return res.ok;
    } catch (err) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { contactData, isLoading, fetchContactSettings, updateContactSettings };
};