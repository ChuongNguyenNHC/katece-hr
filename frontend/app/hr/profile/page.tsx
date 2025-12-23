"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, FileText, Calendar, MapPin } from "lucide-react";
import { mockLaborContracts, mockEmployees } from "@/lib/mock-data";

export default function HrProfilePage() {
  const currentUserId = "2"; // Mock logged-in user (HR Manager - Sarah)
  const contract = mockLaborContracts.find(c => c.nhanVienID === currentUserId);
  const employee = mockEmployees.find(e => e.id === currentUserId);

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ Nhân sự</h1>
        <p className="text-gray-500">Quản lý thông tin cá nhân của Quản lý Nhân sự.</p>
      </div>

      <div className="space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
             <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                 <span className="text-gray-400 text-xs text-center px-2">Tải ảnh lên</span>
             </div>
             <div>
                 <h3 className="text-lg font-medium">{employee?.fullName || "Sarah Williams"}</h3>
                 <p className="text-sm text-gray-500">{employee?.position || "Quản lý Nhân sự"}</p>
                 <Button variant="outline" size="sm" className="mt-2">Đổi ảnh đại diện</Button>
             </div>
        </div>

        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Họ và tên</label>
                    <Input defaultValue={employee?.fullName || "Sarah Williams"} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Chức vụ</label>
                    <Input defaultValue={employee?.position || "Quản lý sản phẩm"} disabled />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                <Input defaultValue={employee?.email || "sarah.w@company.com"} type="email" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Số điện thoại</label>
                <Input defaultValue={employee?.phone || "0901234568"} type="tel" />
            </div>
             
             <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Địa chỉ thường trú</label>
                <Input defaultValue="456 Đại lộ V, Quận 3, TP.HCM" />
            </div>
        </div>

        <div className="pt-4 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">Lưu thay đổi</Button>
        </div>
      </div>

      {/* Contract Section */}
      <div className="space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2 border-b pb-4">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium">Thông tin hợp đồng</h3>
        </div>

        {contract ? (
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                         <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tên hợp đồng</label>
                         <div className="flex items-center gap-2 mt-1 text-gray-900">
                            <FileText className="h-4 w-4 text-gray-400" />
                            {contract.tenHopDong}
                         </div>
                    </div>
                    <div>
                         <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</label>
                         <div className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                contract.trangThaiHDLD === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-800'
                            }`}>
                                {contract.trangThaiHDLD === 'active' ? 'Hoạt động' : contract.trangThaiHDLD}
                            </span>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                         <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Thời hạn hợp đồng</label>
                         <div className="flex items-center gap-2 mt-1 text-gray-900">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {contract.ngayBatDau} — {contract.ngayKetThuc}
                         </div>
                    </div>
                    <div>
                         <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Địa điểm làm việc</label>
                         <div className="flex items-center gap-2 mt-1 text-gray-900">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {contract.diaChiLamViec}
                         </div>
                    </div>
                </div>

                 <div className="pt-4">
                    <Button variant="outline" className="w-full justify-start text-blue-600">
                        <FileText className="mr-2 h-4 w-4" />
                        Tải hợp đồng đã ký (PDF)
                    </Button>
                 </div>
            </div>
        ) : (
            <div className="text-center py-8 text-gray-500">
                Không tìm thấy hợp đồng hoạt động.
            </div>
        )}
      </div>
    </div>
  );
}
