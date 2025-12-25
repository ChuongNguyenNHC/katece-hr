"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, FileText, Download, Calendar, Briefcase, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/hopdongsx');
        const data = await response.json();
        setContracts(data);
    } catch (error) {
        console.error("Error fetching contracts:", error);
    } finally {
        setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Hợp đồng Sản xuất</h1>
          <p className="text-gray-500">Quản lý đơn hàng sản xuất và phân công.</p>
        </div>
        <Link href="/hr/contracts/new">
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
                placeholder="Tìm kiếm theo tên hợp đồng..." 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
        </div>
        <div className="flex items-center gap-2">
            <select className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tất cả trạng thái</option>
                <option>Đang hoạt động</option>
                <option>Đã hoàn thành</option>
                <option>Đã hủy</option>
            </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                <tr>
                    <th className="px-6 py-4">Tên hợp đồng</th>

                    <th className="px-6 py-4">Giá trị / Lương</th>
                    <th className="px-6 py-4">Thời hạn</th>
                    <th className="px-6 py-4">Sản phẩm</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {isLoading ? (
                    <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-gray-500">Đang tải danh sách...</td>
                    </tr>
                ) : contracts.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-gray-500">Chưa có hợp đồng nào.</td>
                    </tr>
                ) : contracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-blue-500" />
                                {contract.tenHopDongSX}
                            </div>
                        </td>   

                        <td className="px-6 py-4 font-medium text-gray-900">
                             <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-gray-400" />
                                {contract.PHANCONGSANXUAT?.reduce((total: number, ps: any) => total + (ps.CONGDOAN?.donGia || 0), 0).toLocaleString()} đ
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                            <div className="flex items-center gap-2 text-xs">
                                <Calendar className="h-3 w-3" />
                                {new Date(contract.ngayBatDau).toLocaleDateString()} - {new Date(contract.ngayKetThuc).toLocaleDateString()}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                {contract.PHANCONGSANXUAT?.length || 0} Sản phẩm
                            </span>
                        </td>
                        <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                ${contract.trangThaiHopDongSX === 'active' || contract.trangThaiHopDongSX === 'Hoạt động' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                  contract.trangThaiHopDongSX === 'Chờ xử lý' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                  'bg-gray-100 text-gray-800'}`}>
                                {contract.trangThaiHopDongSX}
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
