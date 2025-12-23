"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, User, Calendar, FileText, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEmployees } from "@/lib/mock-data";

export default function NewLaborContractPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nhanVienID: "",
    tenHopDong: "",
    loaiLuong: "Monthly",
    giaTriLuong: 0,
    ngayBatDau: "",
    ngayKetThuc: "",
    diaChiLamViec: "",
    trangThaiHDLD: "active",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating Labor Contract:", formData);
    // Mock save delay
    setTimeout(() => router.push('/hr/labor-contracts'), 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
       {/* Header */}
       <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tạo Hợp đồng Lao động</h1>
           <p className="text-gray-500">Tạo hợp đồng làm việc mới cho nhân viên.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-8 space-y-8">
        
        {/* Employee Section */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b pb-2">
                <User className="h-5 w-5 text-blue-600" />
                Thông tin Nhân viên
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Chọn nhân viên</label>
                    <select 
                        name="nhanVienID"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                        onChange={handleInputChange}
                        value={formData.nhanVienID}
                    >
                        <option value="">-- Chọn nhân viên --</option>
                        {mockEmployees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.fullName}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700">Địa điểm làm việc</label>
                     <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                            name="diaChiLamViec" 
                            className="w-full pl-9 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="vd: Chi nhánh TP.HCM"
                            onChange={handleInputChange}
                        />
                     </div>
                </div>
            </div>
        </div>

        {/* Contract Details */}
        <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b pb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Điều khoản Hợp đồng
            </h3>
            
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên hợp đồng / Chức danh</label>
                    <input 
                        name="tenHopDong" 
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="vd: Hợp đồng Lập trình viên Full-time 2024"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                        <div className="relative">
                            <input 
                                type="date"
                                name="ngayBatDau"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Ngày kết thúc</label>
                        <input 
                            type="date"
                            name="ngayKetThuc"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Loại lương</label>
                        <select 
                            name="loaiLuong"
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                            onChange={handleInputChange}
                            value={formData.loaiLuong}
                        >
                            <option value="Monthly">Lương tháng</option>
                            <option value="Hourly">Lương giờ</option>
                            <option value="Project">Theo dự án</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mức lương</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input 
                                type="number"
                                name="giaTriLuong"
                                required
                                min="0"
                                className="w-full pl-9 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="0.00"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => router.back()}>Hủy</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8">
                <Save className="h-4 w-4" />
                Tạo hợp đồng
            </Button>
        </div>

      </form>
    </div>
  );
}
