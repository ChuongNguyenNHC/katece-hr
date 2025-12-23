"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming Input exists from exploration

export default function ProfilePage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ của tôi</h1>
        <p className="text-gray-500">Quản lý thông tin cá nhân và tài khoản.</p>
      </div>

      <div className="space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
             <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                 <span className="text-gray-400 text-xs text-center px-2">Tải ảnh lên</span>
             </div>
             <div>
                 <h3 className="text-lg font-medium">Nguyễn Văn A</h3>
                 <p className="text-sm text-gray-500">Công nhân may</p>
                 <Button variant="outline" size="sm" className="mt-2">Đổi ảnh đại diện</Button>
             </div>
        </div>

        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Họ</label>
                    <Input defaultValue="Nguyễn" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tên</label>
                    <Input defaultValue="Văn A" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                <Input defaultValue="nguyenvana@katece.com" type="email" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Số điện thoại</label>
                <Input defaultValue="090 123 4567" type="tel" />
            </div>
             
             <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Địa chỉ</label>
                <Input defaultValue="123 Đường ABC, Quận 1, TP.HCM" />
            </div>
        </div>

        <div className="pt-4 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">Lưu thay đổi</Button>
        </div>
      </div>
    </div>
  );
}
