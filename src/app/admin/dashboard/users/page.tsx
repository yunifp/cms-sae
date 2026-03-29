/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, User, Mail, 
  Shield, X, Key, Loader2, Search, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useUsers } from '@/hooks/useUsers';

export default function ManageUsersPage() {
  const { users, isLoading, fetchUsers, addUser, editUser, removeUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "ADMIN" });

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, password: "", role: user.role });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "", role: "ADMIN" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = editingUser ? await editUser(editingUser.id, formData) : await addUser(formData);
    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus user ini?")) {
      const result = await removeUser(id);
      if (!result.success) alert(result.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-white pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Manajemen User</h1>
          <p className="text-gray-400 text-sm mt-1">Hanya Superadmin yang dapat mengelola hak akses ini.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-[#DDF247] text-black hover:bg-white px-6 py-6 font-bold rounded-none">
          <Plus className="w-5 h-5 mr-2" /> Tambah User
        </Button>
      </div>

      {/* Toolbar Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
        <input 
          type="text" placeholder="Cari nama atau email..." value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#181A1F] border border-white/5 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#DDF247]/30 transition-all"
        />
      </div>

      <div className="bg-[#181A1F] border border-white/5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th className="px-6 py-5">Nama</th>
              <th className="px-6 py-5">Email</th>
              <th className="px-6 py-5">Role</th>
              <th className="px-6 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading && users.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-20 text-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></td></tr>
            ) : filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-5 font-medium">{u.name}</td>
                <td className="px-6 py-5 text-gray-400">{u.email}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${u.role === 'SUPERADMIN' ? 'bg-[#DDF247]/10 text-[#DDF247]' : 'bg-blue-500/10 text-blue-400'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(u)} className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    {/* PROTEKSI UI: Disable Hapus jika SUPERADMIN */}
                    {u.role !== 'SUPERADMIN' ? (
                      <button onClick={() => handleDelete(u.id)} className="p-2 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="p-2 bg-white/5 text-gray-700 cursor-not-allowed" title="Superadmin tidak bisa dihapus">
                        <Trash2 className="w-4 h-4 opacity-30" />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.form 
              onSubmit={handleSubmit} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#181A1F] border border-white/10 p-8 max-w-md w-full flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-xl font-medium">{editingUser ? "Update User" : "User Baru"}</h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Nama Lengkap</label>
                  <div className="relative"><User className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#121418] border border-white/10 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#DDF247]/50" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Email</label>
                  <div className="relative"><Mail className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#121418] border border-white/10 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#DDF247]/50" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">{editingUser ? "Password Baru (Opsional)" : "Password"}</label>
                  <div className="relative"><Key className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                    <input required={!editingUser} type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[#121418] border border-white/10 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#DDF247]/50" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold">Hak Akses</label>
                  <div className="relative"><Shield className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                    <select 
                      disabled={editingUser?.role === 'SUPERADMIN'}
                      className="w-full bg-[#121418] border border-white/10 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#DDF247]/50 appearance-none disabled:opacity-50"
                      value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="SUPERADMIN">SUPERADMIN</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-[#DDF247] text-black py-7 font-bold hover:bg-white rounded-none">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Simpan Perubahan"}
              </Button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}