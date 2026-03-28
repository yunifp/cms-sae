"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi loading login
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      setIsLoading(false);
      // Nanti ganti dengan auth sungguhan (NextAuth/Supabase/Firebase)
      // Sementara diarahkan ke halaman dashboard
      router.push('/admin/dashboard'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F14] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background decoration (Glow effect tipis) */}
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
        {/* Header Login */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-[#DDF247]/10 flex items-center justify-center rounded-full mb-5 border border-[#DDF247]/20">
            <Lock className="w-7 h-7 text-[#DDF247]" />
          </div>
          <h1 className="text-2xl font-normal text-white mb-2">Login Admin</h1>
          <p className="text-gray-400 text-sm">Masuk untuk mengelola sistem Saeboemi Studio</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121418] border border-white/10 text-white pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#DDF247]/50 transition-colors rounded-sm text-sm"
                placeholder="admin@saeboemistudio.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400 font-medium">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121418] border border-white/10 text-white pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#DDF247]/50 transition-colors rounded-sm text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm mt-1">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="accent-[#DDF247] w-4 h-4 rounded-sm border-gray-600 bg-gray-700" />
              <span>Ingat Saya</span>
            </label>
            <a href="#" className="text-[#DDF247] hover:underline transition-all">Lupa Password?</a>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#DDF247] text-black hover:bg-[#c5db38] rounded-none py-6 font-semibold mt-2 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Memproses...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Masuk ke Dashboard <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

      </motion.div>
    </div>
  );
}