"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Phone, Mail, MapPin, Calendar, Briefcase } from "lucide-react";

export default function TeamLeaderProfilePage() {
  return (
    <div className="max-w-2xl space-y-6 mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ tổ trưởng</h1>
        <p className="text-gray-500">Quản lý thông tin cá nhân và thông tin tổ sản xuất.</p>
      </div>

      {/* Profile Header & Personal Info */}
      <div className="bg-white rounded-xl border shadow-sm p-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-blue-400 opacity-10"></div>
          
          <div className="relative flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-end gap-6 mb-8 pt-4 px-4">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-md ring-4 ring-blue-50 relative z-10">
                  <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                      TB
                  </div>
              </div>
              <div className="pb-2 space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">Trần Thị B</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 justify-center sm:justify-start">
                    <Briefcase className="w-4 h-4" />
                    <span>Tổ Trưởng Chuyền May</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>ID: NV-002</span>
                  </div>
              </div>
              <div className="sm:ml-auto pb-2">
                 <Button variant="outline" size="sm">Đổi ảnh</Button>
              </div>
          </div>

          <div className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                        <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-md border border-gray-100 text-sm md:text-base">
                             <Mail className="w-4 h-4 text-gray-400" />
                             tranthib@katece.com
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Số điện thoại</label>
                         <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-md border border-gray-100 text-sm md:text-base">
                             <Phone className="w-4 h-4 text-gray-400" />
                             090 123 4568
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Địa chỉ</label>
                     <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-md border border-gray-100 text-sm md:text-base">
                         <MapPin className="w-4 h-4 text-gray-400" />
                         456 Đường XYZ, Phường Tân Phong, Quận 7, TP.HCM
                    </div>
                </div>
          </div>
      </div>

       {/* Team Management Info */}
       <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Thông tin Tổ sản xuất
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
                 <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-center">
                     <span className="block text-sm text-blue-600/80 mb-1">Tên tổ</span>
                     <span className="block font-bold text-blue-900 text-lg">Tổ May 1</span>
                 </div>
                  <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100 text-center">
                     <span className="block text-sm text-indigo-600/80 mb-1">Nhân sự</span>
                     <span className="block font-bold text-indigo-900 text-lg">15 người</span>
                 </div>
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-center">
                     <span className="block text-sm text-gray-500 mb-1">Khu vực</span>
                     <span className="block font-bold text-gray-900 text-lg">Tầng 2 - Khu A</span>
                 </div>
            </div>
       </div>
    </div>
  );
}
