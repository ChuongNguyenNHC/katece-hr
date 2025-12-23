"use client";

import { useState } from "react";
import { Check, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockSalaries, mockEmployees } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function PayrollApprovalPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2023-11"); // Oct 16 - Nov 15
  
  // Logic: 
  // Per instruction: "Cycle from 16th previous month to 15th this month"
  // Let's assume the salaries in mockSalaries are generated with a date that falls in this range.
  
  // Filter salaries for the team (t1) and currently pending
  const teamEmployeeIds = mockEmployees.filter(e => e.toSanXuatID === "t1").map(e => e.id);
  
  const pendingSalaries = mockSalaries.filter(s => 
    s.trangThaiDuyetLuong !== 'approved' && // Only show pending/processing
    teamEmployeeIds.includes(s.maNguoiDung || "") // Only my team
  );

  const handleApproveAll = () => {
    alert("Đã duyệt toàn bộ lương cho tổ!");
  };

  const handleApproveSingle = (id: string) => {
    alert(`Đã duyệt lương ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Duyệt bảng lương</h1>
          <p className="text-gray-500">Kiểm tra và xác nhận lương cho tổ viên trước khi gửi kế toán.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-md border shadow-sm">
           <Calendar className="h-4 w-4 text-gray-500 ml-2" />
           <select 
             className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
             value={selectedPeriod}
             onChange={(e) => setSelectedPeriod(e.target.value)}
           >
               <option value="2023-11">Tháng 11 (16/10 - 15/11)</option>
               <option value="2023-12">Tháng 12 (16/11 - 15/12)</option>
           </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
         <div className="p-4 border-b flex items-center justify-between bg-gray-50">
             <div className="font-medium text-gray-700">Danh sách chờ duyệt ({pendingSalaries.length})</div>
             <Button onClick={handleApproveAll} disabled={pendingSalaries.length === 0} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                 <Check className="h-4 w-4" />
                 Duyệt tất cả
             </Button>
         </div>

         <table className="w-full text-sm text-left">
             <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                 <tr>
                     <th className="px-6 py-4 w-10"><Checkbox /></th>
                     <th className="px-6 py-4">Nhân viên</th>
                     <th className="px-6 py-4">Công chuẩn</th>
                     <th className="px-6 py-4">Tăng ca</th>
                     <th className="px-6 py-4">Sản lượng</th>
                     <th className="px-6 py-4">Tổng lương</th>
                     <th className="px-6 py-4 text-right">Hành động</th>
                 </tr>
             </thead>
             <tbody className="divide-y">
                 {pendingSalaries.map(salary => {
                    const employee = mockEmployees.find(e => e.id === salary.maNguoiDung);
                    return (
                        <tr key={salary.id} className="hover:bg-gray-50">
                             <td className="px-6 py-4"><Checkbox /></td>
                             <td className="px-6 py-4 font-medium text-gray-900">{employee?.fullName}</td>
                             <td className="px-6 py-4">26</td>
                             <td className="px-6 py-4">{salary.soGioOT}h</td>
                             <td className="px-6 py-4">{salary.sanLuong ? salary.sanLuong : '--'}</td>
                             <td className="px-6 py-4 font-bold text-blue-600">{salary.tongLuong?.toLocaleString()} đ</td>
                             <td className="px-6 py-4 text-right">
                                 <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                                    onClick={() => handleApproveSingle(salary.id)}
                                >
                                     Duyệt
                                 </Button>
                             </td>
                        </tr>
                    );
                 })}
                 {pendingSalaries.length === 0 && (
                     <tr>
                         <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                             Đã duyệt hết! Không có bảng lương nào cần xử lý.
                         </td>
                     </tr>
                 )}
             </tbody>
         </table>
      </div>
    </div>
  );
}
