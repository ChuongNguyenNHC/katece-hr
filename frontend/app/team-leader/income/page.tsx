"use client";

import { useState } from "react";
import { 
  DollarSign, 
  Calendar, 
  ChevronDown, 
  ChevronUp,
  Send,
  Download,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockSalaries, mockFeedbacks } from "@/lib/mock-data";

export default function TeamLeaderIncomePage() {
  const currentUserId = "2"; // Mock Team Leader ID (using '2' for data availability)
  const salaries = mockSalaries.filter(s => s.TAIKHOAN?.id === currentUserId);
  const feedbacks = mockFeedbacks.filter(f => f.nguoiGuiID === currentUserId);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Thu nhập của tôi</h1>
        <p className="text-gray-500">Xem phiếu lương và lịch sử thu nhập.</p>
      </div>

        {/* Income History */}
        <div className="space-y-4">
            {salaries.map((salary) => (
                <div key={salary.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div 
                        className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleExpand(salary.id)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Lương tháng {new Date(salary.thangLuong || "").toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                                </h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <Calendar className="h-3 w-3" />
                                    Đã xử lý ngày {new Date(salary.created_at).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="font-bold text-lg text-gray-900">{salary.tongLuong?.toLocaleString()} đ</p>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    salary.trangThaiDuyetLuong === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {salary.trangThaiDuyetLuong === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                                </span>
                            </div>
                            {expandedId === salary.id ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                        </div>
                    </div>

                    {expandedId === salary.id && (
                        <div className="px-6 pb-6 pt-0 border-t bg-gray-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Thu nhập</h4>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Lương cơ bản</span>
                                        <span className="font-medium">{salary.luongCoBan?.toLocaleString()} đ</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tăng ca ({salary.soGioOT} giờ)</span>
                                        <span className="font-medium text-emerald-600">+ {salary.tienOT?.toLocaleString()} đ</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Phụ cấp</span>
                                        <span className="font-medium text-emerald-600">+ {salary.phuCap?.toLocaleString()} đ</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tiền thưởng</span>
                                        <span className="font-medium text-emerald-600">+ {salary.tienThuong?.toLocaleString()} đ</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Khấu trừ</h4>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Thuế & Bảo hiểm</span>
                                        <span className="font-medium text-red-600">- {salary.khauTru?.toLocaleString()} đ</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Nghỉ không phép ({salary.soNgayNghiKhongPhep} ngày)</span>
                                        <span className="font-medium text-red-600">- 0 đ</span> 
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Tải PDF
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="gap-2 text-blue-600 hover:text-blue-700"
                                    onClick={() => setFeedbackOpen(salary.id)}
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Báo cáo sai sót
                                </Button>
                            </div>
                            
                            {/* Feedback Form Mock */}
                            {feedbackOpen === salary.id && (
                                <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                                    <h5 className="font-medium text-sm mb-2 text-gray-900">Gửi phản hồi</h5>
                                    <textarea 
                                        className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                                        placeholder="Mô tả sai sót trong bảng lương..."
                                    ></textarea>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button size="sm" variant="ghost" onClick={() => setFeedbackOpen(null)}>Hủy</Button>
                                        <Button size="sm" className="bg-blue-600 text-white gap-2" onClick={() => {
                                            alert("Đã gửi phản hồi!"); 
                                            setFeedbackOpen(null);
                                        }}>
                                            <Send className="h-3 w-3" />
                                            Gửi
                                        </Button>
                                    </div>
                                </div>
                            )}

                             {/* Feedback Status */}
                             {feedbacks.filter(f => f.phieuLuongID === salary.id).length > 0 && (
                                <div className="mt-4 bg-amber-50 p-3 rounded-md border border-amber-100">
                                    <h5 className="text-xs font-bold text-amber-800 uppercase mb-1">Lịch sử phản hồi</h5>
                                    {feedbacks.filter(f => f.phieuLuongID === salary.id).map(f => (
                                        <div key={f.id} className="text-sm text-amber-900">
                                            <span className="font-medium">Bạn:</span> {f.noiDung} 
                                            <span className="ml-2 px-1.5 py-0.5 bg-amber-200 rounded text-xs">
                                                {f.trangThaiPhanHoi === 'processing' ? 'Đang xử lý' : f.trangThaiPhanHoi}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                             )}

                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  );
}
