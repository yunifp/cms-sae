/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [project, setProject] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const fetchProjects = useCallback(async (search = '', status = 'all') => {
    setIsLoading(true);
    try {
      const url = new URL(`${API_URL}/projects`);
      if (search) url.searchParams.append('search', search);
      if (status !== 'all') url.searchParams.append('status', status);
      const res = await fetch(url.toString());
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProjectById = useCallback(async (id: string | number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects/${id}`);
      const data = await res.json();
      setProject(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProject = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects`, {
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

  const updateProject = async (id: string | number, formData: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
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

  const deleteProject = async (id: string | number) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return res.ok;
    } catch (err: any) {
      return false;
    }
  };

  return { 
    projects, project, isLoading, error, 
    fetchProjects, fetchProjectById, createProject, updateProject, deleteProject 
  };
};