"use client";

import { Search, Edit, Plus } from "lucide-react";
import { mockEmployees } from "@/lib/mock-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddEmployeeModal } from "./add-employee-modal";

export default function FactoryManagerWorkerManagementPage() {
    const [positionFilter, setPositionFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

    const handleEmployeeAdded = () => {
        // Refresh logic would go here
        console.log("Employee added");
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
                <option value="Kế toán">Kế toán</option>
                <option value="Kho">Kho</option>
                <option value="Quản lý nhân sự">Quản lý nhân sự</option>
                <option value="Tổ trưởng">Tổ trưởng</option>
            </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                <tr>
                    <th className="px-6 py-4">Họ tên</th>
                    <th className="px-6 py-4">Số điện thoại</th>
                    <th className="px-6 py-4">CCCD</th>
                    <th className="px-6 py-4">Vị trí</th>
                    <th className="px-6 py-4">Nghỉ có phép</th>
                    <th className="px-6 py-4">Nghỉ không phép</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                    {mockEmployees
                        .filter(employee => [
                            'Kế toán',
                            'Kho',
                            'Quản lý nhân sự',
                            'Tổ trưởng',
                        ].includes(employee.position))
                        .filter(employee =>
                            (!positionFilter || employee.position === positionFilter) &&
                            (!statusFilter || employee.trangThaiTaiKhoan === statusFilter)
                        )
                        .map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {employee.fullName.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{employee.fullName}</div>
                                    <div className="text-gray-500 text-xs">{employee.email}</div>
                                </div>
                            </div>
                        </td>
                        
                        <td className="px-6 py-4 text-gray-600">{employee.phone}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.cccd}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.position}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.paidLeaveDayss ?? 0}</td>
                        <td className="px-6 py-4 text-gray-600">{employee.unpaidLeaveDays ?? 0}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                ${employee.trangThaiTaiKhoan === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {employee.trangThaiTaiKhoan === 'active' ? 'Hoạt động' : 'Đã nghỉ việc'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50" title="Sửa">
                                <Edit className="h-4 w-4" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
