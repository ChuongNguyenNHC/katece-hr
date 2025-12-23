"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";

export default function AuthPage() {
    const [loginData, setLoginData] = useState({ login: '', password: '' });

    const handleLogin = async (e :any) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/taikhoan/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const result = await res.json();
            console.log('Login Result:', result);
            alert(JSON.stringify(result));
        } catch (error) {
            console.error(error);
            alert('Login failed. Check console.');
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-900 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                 <Image
                    src="/hero-factory.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-30 blur-sm"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Auth Card */}
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 m-4">
                <div className="text-center mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-xl mb-4 shadow-lg shadow-blue-900/50">
                        K
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Đăng nhập nhân viên</h1>
                    <p className="text-white/60 text-sm mt-2">Nhập thông tin xác thực để truy cập không gian làm việc.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/80 uppercase tracking-wide">Tên đăng nhập hoặc Email</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                            <Input
                                type="text"
                                placeholder="nguyenvana"
                                value={loginData.login}
                                onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
                                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-blue-500"
                                autoComplete="off" // Explicitly off
                            />
                        </div>
                    </div>
                        <div className="space-y-2">
                        <label className="text-xs font-medium text-white/80 uppercase tracking-wide">Mật khẩu</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
                            <Input
                                
                                type="password"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-blue-500"
                                autoComplete="new-password" // Hack to often prevent password autofill
                            />
                        </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 mt-4">
                        Đăng nhập
                    </Button>
                </form>
                
                <div className="mt-8 text-center text-xs text-white/40">
                    <p>&copy; 2024 Nhà máy may Katece. Hệ thống bảo mật.</p>
                </div>
            </div>
        </div>
    );
}