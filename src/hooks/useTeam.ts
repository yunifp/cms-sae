/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from 'react';

export const useTeam = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeams = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`);
      const data = await res.json();
      setTeams(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMember = async (formData: FormData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    return res.ok;
  };

  const removeMember = async (id: number) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.ok;
  };

  return { teams, isLoading, fetchTeams, addMember, removeMember };
};