"use client";

import Link from "next/link";
import { Plus, Search, MoreVertical, FileText, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEmployees, getWorkers } from "@/lib/api";
import { useState, useEffect } from "react";
import { AddEmployeeModal } from "./add-employee-modal";

export default function EmployeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
        setLoading(true);
        const [empData, workerData] = await Promise.all([
            getEmployees(),
            getWorkers()
        ]);
        setEmployees([...empData, ...workerData]);
    } catch (error) {
        console.error("Failed to fetch employees", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
            fetchEmployees();
        }} 
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Nhân viên</h1>
          <p className="text-gray-500">Quản lý nhân sự.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Thêm nhân viên
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Tìm kiếm nhân viên..." 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
        </div>
        <div className="flex items-center gap-2">
            <select className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tất cả trạng thái</option>
                <option>Hoạt động</option>
                <option>Đã nghỉ việc</option>
            </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {loading ? (
            <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : (
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                <tr>
                    <th className="px-6 py-4">Họ tên</th>
                    <th className="px-6 py-4">Vị trí</th>
                    <th className="px-6 py-4">Tổ / Nhóm</th>
                    <th className="px-6 py-4">Email / SĐT</th>
                    <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {employee.fullName?.split(" ").map((n:any) => n[0]).join("") || "NV"}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{employee.fullName}</div>
                                    <div className="text-gray-500 text-xs">{employee.username}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{employee.position}</td>
                        <td className="px-6 py-4">
                            {employee.TOSANXUAT ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                    {employee.TOSANXUAT.tenTo}
                                </span>
                            ) : (
                                <span className="text-gray-400 italic text-xs">Chưa phân tổ</span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="text-xs text-gray-900">{employee.email}</span>
                                <span className="text-xs text-gray-500">{employee.phone}</span>
                             </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                                <Link href={`/hr/employees/${employee.id}`} className="p-2 text-gray-400 hover:text-amber-600 rounded-full hover:bg-amber-50" title="Sửa">
                                    <Edit className="h-4 w-4" />
                                </Link>
                                <button className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50" title="Xóa">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {employees.length === 0 && (
                    <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">
                            Chưa có nhân viên nào.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        )}
      </div>
    </div>
  );
}
