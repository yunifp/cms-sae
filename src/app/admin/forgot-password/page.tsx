"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordPage() {
  const { sendOtp, resetPassword, isLoading, error, message, setError, setMessage } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await sendOtp(email);
    if (success) setStep(2);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    const success = await resetPassword({ email, otp, newPassword });
    if (success) {
      // Form akan otomatis menampilkan pesan sukses dari hook
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F14] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#DDF247]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-[#DDF247]/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#181A1F] border border-white/5 p-8 md:p-10 relative z-10 rounded-sm shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-[#DDF247]/10 flex items-center justify-center rounded-full mb-5 border border-[#DDF247]/20">
            <KeyRound className="w-7 h-7 text-[#DDF247]" />
          </div>
          <h1 className="text-2xl font-normal text-white mb-2 uppercase tracking-tight">
            {step === 1 ? "Reset Password" : "Verifikasi OTP"}
          </h1>
          <p className="text-gray-400 text-sm">
            {step === 1 
              ? "Masukkan email admin untuk menerima kode verifikasi." 
              : "Masukkan kode 6-digit yang dikirim ke email Anda."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.form 
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onSubmit={step === 1 ? handleSendOtp : handleResetPassword} 
            className="flex flex-col gap-5"
          >
            
            {/* Alert Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[11px] p-3 rounded-sm flex items-center gap-2 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Alert Success */}
            {message && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-[11px] p-3 rounded-sm flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <p>{message}</p>
              </div>
            )}
            
            {/* Step 1: Input Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-600" />
                <input 
                  type="email" 
                  required
                  disabled={step === 2 || isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121418] border border-white/10 text-white pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#DDF247]/50 transition-colors rounded-sm text-sm disabled:opacity-50"
                  placeholder="admin@saeboemi.com"
                />
              </div>
            </div>

            {/* Step 2: Input OTP & Password Baru */}
            {step === 2 && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-[#DDF247] uppercase tracking-widest font-bold">Kode OTP (6-Digit)</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-3.5 h-5 w-5 text-[#DDF247]/60" />
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-[#121418] border border-[#DDF247]/20 text-[#DDF247] pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#DDF247] transition-colors rounded-sm text-sm tracking-[0.5em] font-bold"
                      placeholder="000000"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Password Baru</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-600" />
                    <input 
                      type="password" 
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#121418] border border-white/10 text-white pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#DDF247]/50 transition-colors rounded-sm text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Konfirmasi Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-600" />
                    <input 
                      type="password" 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#121418] border border-white/10 text-white pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#DDF247]/50 transition-colors rounded-sm text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Action Button */}
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#DDF247] text-black hover:bg-white rounded-none py-7 font-bold mt-2 uppercase tracking-widest transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                step === 1 ? "Kirim Kode Verifikasi" : "Reset Password Sekarang"
              )}
            </Button>

            <div className="flex flex-col gap-3 items-center mt-2">
              {step === 2 && (
                <button 
                  type="button"
                  onClick={() => { setStep(1); setMessage(null); setError(null); }}
                  className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Ganti Email?
                </button>
              )}
              <Link href="/admin/login" className="text-[11px] text-gray-500 hover:text-[#DDF247] flex items-center gap-2 uppercase tracking-widest font-bold transition-colors">
                <ArrowLeft className="w-3 h-3" /> Kembali ke Login
              </Link>
            </div>
          </motion.form>
        </AnimatePresence>

      </motion.div>
    </div>
  );
}