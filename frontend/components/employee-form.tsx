"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { Taikhoan } from "@/types/schema";

interface EmployeeFormProps {
    initialData?: Partial<Taikhoan>;
    onSubmit: (data: Partial<Taikhoan>) => void;
}

export function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps) {
    const [formData, setFormData] = useState<Partial<Taikhoan>>(initialData || {
        fullName: "",
        username: "",
        email: "",
        phone: "",
        position: "",
        cccd: "",
        password: "", // Only relevant for creation usually
        trangThaiTaiKhoan: "active",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Photo Section (Visual only) */}
            <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                    <Camera className="h-8 w-8" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-900">Ảnh hồ sơ</h3>
                    <p className="text-xs text-gray-500 mb-3">Tải lên ảnh thẻ chuyên nghiệp cho hồ sơ nhân viên.</p>
                    <Button type="button" variant="outline" size="sm" className="gap-2">
                        <Upload className="h-3 w-3" />
                        Tải ảnh lên
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-sm font-medium text-gray-700">Họ và tên</label>
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="VD: Nguyễn Văn A"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên đăng nhập</label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="nguyenvan_a"
                        disabled={!!initialData?.id} // Disable username edit if updating
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="nguyen.van.a@congty.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="0901234567"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Số CCCD/CMND</label>
                    <input
                        name="cccd"
                        value={formData.cccd}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="001099000..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Vị trí / Chức vụ</label>
                    <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    >
                        <option value="" disabled>-- Chọn vị trí --</option>
                        <option value="Cong Nhan May">Cong Nhan May</option>
                        <option value="To Truong">To Truong</option>
                        <option value="Thợ cắt">Thợ cắt</option>
                        <option value="KCS">KCS (Kiểm tra chất lượng)</option>
                        <option value="Thợ là">Thợ là</option>
                        <option value="Kho">Kho</option>
                        <option value="Kỹ thuật chuyền">Kỹ thuật chuyền</option>
                        <option value="Quan Ly Xuong">Quan Ly Xuong</option>
                        <option value="Ke Toan">Ke Toan</option>
                        <option value="Nhan Su">Nhan Su</option>
                        <option value="Bảo vệ">Bảo vệ</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Trạng thái</label>
                    <select
                        name="trangThaiTaiKhoan"
                        value={formData.trangThaiTaiKhoan}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    >
                        <option value="active">Đang hoạt động</option>
                        <option value="inactive">Ngưng hoạt động</option>
                    </select>
                </div>

                {!initialData?.id && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mật khẩu khởi tạo</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!initialData}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" type="button" onClick={() => window.history.back()}>Hủy</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                    {initialData?.id ? "Cập nhật" : "Thêm mới"}
                </Button>
            </div>
        </form>
    );
}
