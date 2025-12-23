"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
const EditPayrollPopup = dynamic(() => import("@/components/Accountant/EditPayrollPopup"), { ssr: false });

type PayrollRow = {
  name: string;
  month: string;
  year: string;
  salary: string;
  otHours: string;
  paidLeave: string;
  unpaidLeave: string;
  otPay: string;
  allowance: string;
  bonus: string;
  deduction: string;
  total: string;
  status: string;
};

// dữ liệu bảng lương mẫu
const payrollData: PayrollRow[] = [
  {
    name: "Nguyễn Văn A",
    month: "11",
    year: "2025",
    salary: "18,000,000₫",
    otHours: "-",
    paidLeave: "-",
    unpaidLeave: "-",
    otPay: "-",
    allowance: "-",
    bonus: "-",
    deduction: "-",
    total: "-",
    status: "Chờ xử lý",
  },
  {
    name: "Nguyễn Văn B",
    month: "12",
    year: "2025",
    salary: "18,000,000₫",
    otHours: "-",
    paidLeave: "-",
    unpaidLeave: "-",
    otPay: "-",
    allowance: "-",
    bonus: "-",
    deduction: "-",
    total: "-",
    status: "Chờ xử lý",
  },
  {
    name: "Trần Thị C",
    month: "12",
    year: "2024",
    salary: "20,000,000₫",
    otHours: "10",
    paidLeave: "2",
    unpaidLeave: "0",
    otPay: "2,000,000₫",
    allowance: "1,000,000₫",
    bonus: "500,000₫",
    deduction: "100,000₫",
    total: "23,400,000₫",
    status: "Đã xử lý",
  },
  {
    name: "Lê Văn D",
    month: "11",
    year: "2025",
    salary: "19,000,000₫",
    otHours: "5",
    paidLeave: "1",
    unpaidLeave: "0",
    otPay: "1,000,000₫",
    allowance: "500,000₫",
    bonus: "200,000₫",
    deduction: "50,000₫",
    total: "20,650,000₫",
    status: "Đã trả",
  },
];
// Hàm lấy class màu theo trạng thái
function getStatusColor(status: string) {
  switch (status) {
    case "Đã xử lý":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    case "Đã trả":
      return "bg-green-100 text-green-700 hover:bg-green-100";
    case "Chờ xử lý":
      return "bg-red-100 text-red-700 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function EditPayrollPage() {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);
    const [editRow, setEditRow] = useState<PayrollRow | null>(null);
    const [data, setData] = useState<PayrollRow[]>(payrollData);

    // Các giá trị tháng, năm, trạng thái để lọc
    const months = ["", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const years = ["", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
    const statuses = ["", "Đã trả", "Chờ xử lý", "Đã xử lý"];
    // Lọc theo tháng, năm, trạng thái nếu có chọn, nếu không thì hiển thị toàn bộ
    const filteredData = data.filter(row => {
      const matchMonth = selectedMonth ? row.month === selectedMonth : true;
      const matchYear = selectedYear ? row.year === selectedYear : true;
      const matchStatus = selectedStatus ? row.status === selectedStatus : true;
      return matchMonth && matchYear && matchStatus;
    });

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const handleEdit = (row: PayrollRow, idx?: number) => {
      setEditRow({ ...row });
      setEditIndex(typeof idx === 'number' ? idx : null);
      setPopupOpen(true);
    };

    const handleSave = (newRow: PayrollRow) => {
      setData(prev =>
        prev.map((r, idx) =>
          idx === editIndex ? newRow : r
        )
      );
      setPopupOpen(false);
    };

    const handleClose = () => {
      setPopupOpen(false);
    };

    return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý bảng lương</h1>
        <p className="text-gray-500">Danh sách bảng lương nhân viên, có thể xem và chỉnh sửa từng dòng.</p>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <select
          id="month"
          className="border rounded px-2 py-1 text-sm"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
        >
          <option value="">Tháng</option>
          {months.slice(1).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          id="year"
          className="border rounded px-2 py-1 text-sm"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
        >
          <option value="">Năm</option>
          {years.slice(1).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          id="status"
          className="border rounded px-2 py-1 text-sm"
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
        >
          <option value="">Trạng thái</option>
          {statuses.slice(1).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-[1100px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Thao tác</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Họ tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">Tháng/Năm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Lương cơ bản</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Số giờ OT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Số ngày nghỉ có phép</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Số ngày nghỉ không phép</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Tiền OT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Phụ cấp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Thưởng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Khấu trừ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Tổng lương</th>
            </tr>
          </thead>
        
            {/* thân bảng */}
          <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center py-6 text-gray-400">Không có dữ liệu cho tháng này.</td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={row.name + row.month + idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="default" size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleEdit(row, data.findIndex(r => r.name === row.name && r.month === row.month && r.year === row.year))}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(row.status)}>{row.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.month}/{row.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.salary}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.otHours}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.paidLeave}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.unpaidLeave}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.otPay}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.allowance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.bonus}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.deduction}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.total}</td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
      {/* Popup chỉnh sửa bảng lương */}
      <EditPayrollPopup open={popupOpen} onClose={handleClose} data={editRow} onSave={handleSave} />
    </div>
  );
}
