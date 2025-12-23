"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, MapPin, Briefcase, FileText } from "lucide-react";

export default function HRProfilePage() {
  return (
    <div className="max-w-2xl space-y-6 mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ nhân sự</h1>
        <p className="text-gray-500">Quản lý thông tin quản trị viên hệ thống.</p>
      </div>

      {/* Profile Header & Personal Info */}
      <div className="bg-white rounded-xl border shadow-sm p-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-600 to-purple-400 opacity-10"></div>
          
          <div className="relative flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-end gap-6 mb-8 pt-4 px-4">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-md ring-4 ring-purple-50 relative z-10">
                  <div className="h-full w-full rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-2xl">
                      HR
                  </div>
              </div>
              <div className="pb-2 space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">HR Manager</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 justify-center sm:justify-start">
                    <Briefcase className="w-4 h-4" />
                    <span>Quản lý Nhân Sự</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>Admin</span>
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
                             hr@katece.com
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hotline nội bộ</label>
                         <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-md border border-gray-100 text-sm md:text-base">
                             <Phone className="w-4 h-4 text-gray-400" />
                             1900 1234 (Ext: 101)
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Văn phòng</label>
                     <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-md border border-gray-100 text-sm md:text-base">
                         <MapPin className="w-4 h-4 text-gray-400" />
                         Phòng HR - Tầng trệt, Tòa nhà Katece
                    </div>
                </div>
          </div>
      </div>

       {/* HR Specific Stats */}
       <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Tổng quan quyền hạn
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
                 <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                         <Users className="h-5 w-5" />
                     </div>
                     <div>
                         <p className="text-sm text-gray-500">Quản lý nhân sự</p>
                         <p className="font-bold text-gray-900">Toàn công ty</p>
                     </div>
                 </div>
                 <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                         <FileText className="h-5 w-5" />
                     </div>
                     <div>
                         <p className="text-sm text-gray-500">Phê duyệt lương</p>
                         <p className="font-bold text-gray-900">Cấp cao nhất</p>
                     </div>
                 </div>
            </div>
       </div>
    </div>
  );
}
