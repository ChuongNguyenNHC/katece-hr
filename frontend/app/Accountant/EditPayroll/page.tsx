"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";

export default function EditPayrollPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Phản hồi lương</h1>
          <p className="text-gray-500">Quản lý các phản hồi và chỉnh sửa lương cho nhân viên.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Payroll Feedback Card 1 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Nguyễn Văn A</h3>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Chờ xử lý</Badge>
            </div>
            <p className="text-sm text-gray-500">Tháng 12/2025 - Lỗi tính lương tăng ca</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> Xem
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4" /> Chỉnh sửa
            </Button>
          </div>
        </div>

        {/* Payroll Feedback Card 2 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Trần Thị B</h3>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Đã xử lý</Badge>
            </div>
            <p className="text-sm text-gray-500">Tháng 12/2025 - Đề nghị điều chỉnh phụ cấp</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> Xem
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4" /> Chỉnh sửa
            </Button>
          </div>
        </div>

        {/* Payroll Feedback Card 3 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Trần Thị B</h3>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Đã xử lý</Badge>
            </div>
            <p className="text-sm text-gray-500">Tháng 12/2025 - Đề nghị điều chỉnh phụ cấp</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> Xem
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4" /> Chỉnh sửa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
