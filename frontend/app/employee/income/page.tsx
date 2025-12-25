"use client";

import { useState, useEffect } from "react";
import {
    DollarSign,
    Calendar,
    FileText,
    MessageSquare,
    ChevronDown,
    ChevronUp,
    Send,
    Download,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalaryFeedbackModal } from "@/components/salary-feedback-modal";
import { mockSalaries, mockFeedbacks } from "@/lib/mock-data";
import { Bangluong, Phanhoiluong } from "@/types/schema";

export default function IncomePage() {
    const currentUserId = "1"; // Mock logged-in user
    const salaries = mockSalaries.filter(s => s.TAIKHOAN?.id === currentUserId);
    const feedbacks = mockFeedbacks.filter(f => f.nguoiGuiID === currentUserId);

    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [feedbackOpenId, setFeedbackOpenId] = useState<string | null>(null); // Id of payslip being feedbacked
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Thu nhập của tôi</h1>
                    <p className="text-gray-500">Xem phiếu lương và lịch sử thu nhập.</p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    onClick={() => setFeedbackOpenId("general")}
                >
                    <Plus className="h-4 w-4" />
                    Thêm yêu cầu
                </Button>
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
                                        Lương tháng {isMounted ? new Date(salary.thangLuong || "").toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }) : "--"}
                                    </h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <Calendar className="h-3 w-3" />
                                        Đã xử lý ngày {isMounted ? new Date(salary.created_at).toLocaleDateString('vi-VN') : "--"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="font-bold text-lg text-gray-900">{isMounted ? salary.tongLuong?.toLocaleString() : "--"} đ</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${salary.trangThaiDuyetLuong === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
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
                                            <span className="font-medium">{isMounted ? salary.luongCoBan?.toLocaleString() : "--"} đ</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tăng ca ({salary.soGioOT} giờ)</span>
                                            <span className="font-medium text-emerald-600">+ {isMounted ? salary.tienOT?.toLocaleString() : "--"} đ</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Phụ cấp</span>
                                            <span className="font-medium text-emerald-600">+ {isMounted ? salary.phuCap?.toLocaleString() : "--"} đ</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tiền thưởng</span>
                                            <span className="font-medium text-emerald-600">+ {isMounted ? salary.tienThuong?.toLocaleString() : "--"} đ</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Khấu trừ</h4>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Thuế & Bảo hiểm</span>
                                            <span className="font-medium text-red-600">- {isMounted ? salary.khauTru?.toLocaleString() : "--"} đ</span>
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFeedbackOpenId(salary.id);
                                        }}
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        Báo cáo sai sót
                                    </Button>
                                </div>

                                {/* Existing Feedback Status */}
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

            <SalaryFeedbackModal
                isOpen={!!feedbackOpenId}
                onClose={() => setFeedbackOpenId(null)}
                salaryId={feedbackOpenId === "general" ? null : feedbackOpenId}
                monthYear={isMounted && feedbackOpenId && feedbackOpenId !== "general" ? new Date(salaries.find(s => s.id === feedbackOpenId)?.thangLuong || "").toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }) : ""}
            />
        </div>
    );
}
