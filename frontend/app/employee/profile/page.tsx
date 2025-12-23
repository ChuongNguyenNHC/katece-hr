"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, MapPin, Calendar, Briefcase } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl space-y-6 mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ công nhân</h1>
        <p className="text-gray-500">Quản lý thông tin cá nhân và hợp đồng lao động.</p>
      </div>

      {/* Profile Header & Personal Info */}
      <div className="bg-white rounded-xl border shadow-sm p-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-blue-400 opacity-10"></div>
          
          <div className="relative flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-end gap-6 mb-8 pt-4 px-4">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-md ring-4 ring-blue-50 relative z-10">
                  <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                      NVA
                  </div>
              </div>
              <div className="pb-2 space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">Nguyễn Văn A</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 justify-center sm:justify-start">
                    <Briefcase className="w-4 h-4" />
                    <span>Công nhân may</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>ID: NV-001</span>
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
                             nguyenvana@katece.com
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Số điện thoại</label>
                         <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-md border border-gray-100 text-sm md:text-base">
                             <Phone className="w-4 h-4 text-gray-400" />
                             090 123 4567
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Địa chỉ</label>
                     <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-md border border-gray-100 text-sm md:text-base">
                         <MapPin className="w-4 h-4 text-gray-400" />
                         123 Đường ABC, Phường Tân Phong, Quận 7, TP.HCM
                    </div>
                </div>
          </div>
      </div>

       {/* Contract & Team Info */}
       <div className="grid sm:grid-cols-2 gap-6">
           <div className="bg-white rounded-xl border shadow-sm p-6 overflow-hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Đơn vị công tác
                </h3>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-dashed">
                        <span className="text-sm text-gray-500">Tổ sản xuất</span>
                        <span className="font-medium">Tổ May 1</span>
                    </div>
                     <div className="flex justify-between items-center py-2 border-b border-dashed">
                        <span className="text-sm text-gray-500">Khu vực</span>
                        <span className="font-medium">Xưởng A</span>
                    </div>
                     <div className="flex justify-between items-center py-2 border-dashed">
                        <span className="text-sm text-gray-500">Chi nhánh</span>
                        <span className="font-medium">Hồ Chí Minh</span>
                    </div>
                </div>
           </div>

            <div className="bg-white rounded-xl border shadow-sm p-6 overflow-hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" /> 
                    Hợp đồng
                </h3>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-dashed">
                        <span className="text-sm text-gray-500">Loại HĐ</span>
                        <span className="font-medium text-blue-600">Dài hạn 3 năm</span>
                    </div>
                     <div className="flex justify-between items-center py-2 border-b border-dashed">
                        <span className="text-sm text-gray-500">Ngày hiệu lực</span>
                        <span className="font-medium">01/01/2023</span>
                    </div>
                     <div className="flex justify-between items-center py-2 border-dashed">
                        <span className="text-sm text-gray-500">Ngày hết hạn</span>
                        <span className="font-medium">01/01/2026</span>
                    </div>
                </div>
            </div>
       </div>

       <div className="flex justify-center pt-4">
            <Button variant="link" className="text-gray-400 hover:text-gray-600 text-xs">
                Cần hỗ trợ? Liên hệ Phòng Nhân sự
            </Button>
       </div>
    </div>
  );
}
