/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';
import { getUsersAPI, createUserAPI, updateUserAPI, deleteUserAPI } from '@/services/userApi';

export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUsersAPI();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addUser = async (payload: any) => {
    setIsLoading(true);
    try {
      await createUserAPI(payload);
      await fetchUsers(); // Refresh data setelah tambah
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (id: number, payload: any) => {
    setIsLoading(true);
    try {
      await updateUserAPI(id, payload);
      await fetchUsers(); // Refresh data setelah edit
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const removeUser = async (id: number) => {
    try {
      await deleteUserAPI(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  return { 
    users, 
    isLoading, 
    error, 
    fetchUsers, 
    addUser, 
    editUser, 
    removeUser 
  };
};