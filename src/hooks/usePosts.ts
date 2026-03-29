/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const usePosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [post, setPost] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPostById = useCallback(async (id: string | number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPost = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/posts`, {
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

  const updatePost = async (id: string | number, formData: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
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

  const deletePost = async (id: string | number) => {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      return res.ok;
    } catch (err: any) {
      return false;
    }
  };

  return { 
    posts, post, isLoading, error, 
    fetchPosts, fetchPostById, createPost, updatePost, deletePost 
  };
};