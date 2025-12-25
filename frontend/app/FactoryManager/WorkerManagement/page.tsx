"use client";

import { Search, Edit, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AddEmployeeModal } from "./add-employee-modal";
import { getEmployees, getWorkers } from "@/lib/api";

export default function FactoryManagerWorkerManagementPage() {
    const [positionFilter, setPositionFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [empData, workerData] = await Promise.all([
                getEmployees(),
                getWorkers()
            ]);
            // Combine both lists
            setEmployees([...empData, ...workerData]);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEmployeeAdded = () => {
        fetchData();
    };

    return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Nhân viên</h1>
          <p className="text-gray-500">Quản lý nhân sự.</p>
        </div>
        <Button 
            onClick={() => setIsAddEmployeeOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
            <Plus className="h-4 w-4" />
            Thêm nhân viên
        </Button>
      </div>

      <AddEmployeeModal 
        isOpen={isAddEmployeeOpen}
        onClose={() => setIsAddEmployeeOpen(false)}
        onSuccess={handleEmployeeAdded}
      />

      {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
                <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Tìm kiếm công nhân..." 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
        </div>
        <div className="flex items-center gap-2">
            <select className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
            >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Đã nghỉ việc</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <select
                className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={positionFilter}
                onChange={e => setPositionFilter(e.target.value)}
            >
                <option value="">Tất cả chức vụ</option>
                <option value="Ke toan">Kế toán</option>
                <option value="Kho">Kho</option>
                <option value="Quan ly nhan su">Quản lý nhân sự</option>
                <option value="To truong">Tổ trưởng</option>
                <option value="Cong nhan">Công nhân</option>
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
                    <th className="px-6 py-4">Số điện thoại</th>
                    <th className="px-6 py-4">CCCD</th>
                    <th className="px-6 py-4">Vị trí</th>
                    {/* Removed paid/unpaid leave placeholder columns as they are not in user model yet */}
                    {/* <th className="px-6 py-4">Nghỉ có phép</th> */}
                    {/* <th className="px-6 py-4">Nghỉ không phép</th> */}
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                    {employees
                        .filter(employee =>
                            (!positionFilter || employee.position === positionFilter)
                             // Simple status filter logic if field exists, otherwise ignore
                             // && (!statusFilter || employee.trangThaiTaiKhoan === statusFilter)
                        )
                        .map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {employee.fullName?.split(" ").map((n:any) => n[0]).join("") || "NV"}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{employee.fullName}</div>
                                    <div className="text-gray-500 text-xs">{employee.username || employee.email}</div>
                                </div>
                            </div>
                        </td>
                        
                        <td className="px-6 py-4 text-gray-600">{employee.phone}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.cccd}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.position}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-100`}>
                                Hoạt động
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50" title="Sửa">
                                <Edit className="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                ))}
                 {employees.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500 italic">
                            Không tìm thấy nhân viên nào.
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
