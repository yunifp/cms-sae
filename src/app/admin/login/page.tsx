"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F14] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#DDF247]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-[#DDF247]/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#181A1F] border border-white/5 p-8 md:p-10 relative z-10 rounded-sm shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-[#DDF247]/10 flex items-center justify-center rounded-full mb-5 border border-[#DDF247]/20">
            <Lock className="w-7 h-7 text-[#DDF247]" />
          </div>
          <h1 className="text-2xl font-normal text-white mb-2 uppercase tracking-tight">Login Admin</h1>
          <p className="text-gray-400 text-sm">Masuk untuk mengelola sistem Saeboemi Studio</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[11px] p-3 rounded-sm flex items-center gap-2 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-600" />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121418] border border-white/10 text-white pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#DDF247]/50 transition-colors rounded-sm text-sm"
                placeholder="admin@saeboemistudio.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-600" />
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121418] border border-white/10 text-white pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#DDF247]/50 transition-colors rounded-sm text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] mt-1 uppercase tracking-widest">
            <label className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="accent-[#DDF247] w-4 h-4 bg-[#121418] border-white/10" />
              <span>Ingat Saya</span>
            </label>
            {/* Hapus properti size="sm" di sini */}
            <Link href="/admin/forgot-password" className="text-[#DDF247] hover:underline transition-all font-bold">
              Lupa Password?
            </Link>
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#DDF247] text-black hover:bg-white rounded-none py-7 font-bold mt-2 uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Masuk Dashboard <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}