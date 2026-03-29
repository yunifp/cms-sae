/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const useServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [service, setService] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchServiceById = useCallback(async (id: string | number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/services/${id}`);
      const data = await res.json();
      setService(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createService = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: formData
      });
      return res.ok;
    } catch (err: any) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateService = async (id: string | number, formData: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: formData
      });
      return res.ok;
    } catch (err: any) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (id: string | number) => {
    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return res.ok;
    } catch (err: any) {
      return false;
    }
  };

  return { 
    services, service, isLoading, error, 
    fetchServices, fetchServiceById, createService, updateService, deleteService 
  };
};