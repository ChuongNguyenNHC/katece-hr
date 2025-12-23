"use client";

import Link from "next/link";
import { Plus, Search, FileText, Download, Calendar, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockLaborContracts } from "@/lib/mock-data";

export default function LaborContractsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Hợp đồng Lao động</h1>
          <p className="text-gray-500">Quản lý các hợp đồng lao động của công nhân.</p>
        </div>
        <Link href="/hr/labor-contracts/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Tạo hợp đồng
          </Button>
        </Link>
      </div>

       <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Tìm kiếm theo tên công nhân..." 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
        </div>
        <div className="flex items-center gap-2">
            <select className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tất cả trạng thái</option>
                <option>Đang hoạt động</option>
                <option>Đã chấm dứt</option>
                <option>Hết hạn</option>
            </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                <tr>
                    <th className="px-6 py-4">Công nhân</th>
                    <th className="px-6 py-4">Tên hợp đồng</th>
                    <th className="px-6 py-4">Lương / Loại</th>
                    <th className="px-6 py-4">Thời hạn</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {mockLaborContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 text-gray-900 font-medium">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                    {contract.TAIKHOAN?.fullName.charAt(0)}
                                </div>
                                {contract.TAIKHOAN?.fullName || "Không xác định"}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                             <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-gray-400" />
                                {contract.tenHopDong}
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                             <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-gray-400" />
                                {contract.giaTriLuong?.toLocaleString()} 
                                <span className="text-xs text-gray-500 font-normal ml-1">({contract.loaiLuong})</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                            <div className="flex items-center gap-2 text-xs">
                                <Calendar className="h-3 w-3" />
                                {contract.ngayBatDau} - {contract.ngayKetThuc}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                ${contract.trangThaiHDLD === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {contract.trangThaiHDLD === 'active' ? 'Hoạt động' : contract.trangThaiHDLD}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50" title="Xem chi tiết">
                                    <FileText className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100" title="Tải PDF">
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
