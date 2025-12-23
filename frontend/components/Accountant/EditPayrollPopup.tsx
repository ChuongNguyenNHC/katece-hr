
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { Bangluong } from "@/types/schema";

type EditPayrollPopupProps = {
  open: boolean;
  onClose: () => void;
  data: Bangluong | null;
  onSave: (data: Bangluong) => void;
};


export default function EditPayrollPopup({ open, onClose, data, onSave }: EditPayrollPopupProps) {
  const [form, setForm] = useState<Bangluong | null>(data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Cập nhật form khi data thay đổi
  React.useEffect(() => {
    setForm(data);
    setErrors({});
  }, [data]);

  if (!form) return null;

  // Hàm xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!form) return;
    let newValue: any = value;
    // Chuyển đổi kiểu cho các trường số
    if (["luongCoBan", "tienOT", "phuCap", "tienThuong", "khauTru", "tongLuong", "soNgayNghiCoPhep", "soNgayNghiKhongPhep", "soGioOT", "sanLuong"].includes(name)) {
      newValue = value === "" ? "" : Number(value);
    }
    setForm({ ...form, [name]: newValue });
    // Validate realtime cho trường thangLuong
    if (name === "thangLuong") {
      let err = "";
      if (!value.trim()) {
        err = "Tháng lương không được để trống";
      } else if (!/^\d{1,2}\/\d{4}$/.test(value)) {
        err = "Định dạng phải là mm/yyyy";
      } else {
        const [m, y] = value.split("/");
        if (Number(m) < 1 || Number(m) > 12) err = "Tháng phải từ 1 đến 12";
      }
      setErrors((prev) => ({ ...prev, [name]: err }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Hàm validate form
  const validate = (f: Bangluong) => {
    const newErrors: { [key: string]: string } = {};
    if (!f.TAIKHOAN?.fullName && !f.maNguoiDung) newErrors.TAIKHOAN = "Họ tên không được để trống";
    if (!f.thangLuong || !/^\d{1,2}\/\d{4}$/.test(f.thangLuong)) {
      newErrors.thangLuong = "Tháng lương phải có định dạng mm/yyyy";
    } else {
      const [m, y] = f.thangLuong.split("/");
      if (Number(m) < 1 || Number(m) > 12) newErrors.thangLuong = "Tháng phải từ 1 đến 12";
      if (Number(y) < 1900 || Number(y) > 2100) newErrors.thangLuong = "Năm không hợp lệ";
    }
    // Validate các trường số: không được để trống, không âm, phải là số hợp lệ
    const numberFields = [
      { key: "luongCoBan", label: "Lương cơ bản" },
      { key: "tienOT", label: "Tiền OT" },
      { key: "phuCap", label: "Phụ cấp" },
      { key: "tienThuong", label: "Thưởng" },
      { key: "khauTru", label: "Khấu trừ" },
      { key: "tongLuong", label: "Tổng lương" },
      { key: "soNgayNghiCoPhep", label: "Số ngày nghỉ có phép" },
      { key: "soNgayNghiKhongPhep", label: "Số ngày nghỉ không phép" },
      { key: "soGioOT", label: "Số giờ OT" },
      { key: "sanLuong", label: "Sản lượng" },
    ];
    numberFields.forEach(({ key, label }) => {
      const val = f[key as keyof Bangluong];
      if (val === undefined || val === null || val === "") {
        newErrors[key] = `${label} không được để trống`;
      } else if (typeof val === "number" && val < 0) {
        newErrors[key] = `${label} không được âm`;
      }
    });
    if (!f.trangThaiDuyetLuong) newErrors.trangThaiDuyetLuong = "Trạng thái không được để trống";
    return newErrors;
  };

  // Hàm submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const formData: Bangluong = { ...form };
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa bảng lương</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Họ tên</label>
              <input className={`border rounded px-2 py-1 ${errors.TAIKHOAN ? 'border-red-500' : ''}`} name="TAIKHOAN" value={form.TAIKHOAN?.fullName || ''} disabled placeholder="Họ tên" />
              {errors.TAIKHOAN && <span className="text-xs text-red-500 mt-1">{errors.TAIKHOAN}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Tháng lương</label>
              <input className={`border rounded px-2 py-1 ${errors.thangLuong ? 'border-red-500' : ''}`} name="thangLuong" value={form.thangLuong || ''} onChange={handleChange} placeholder="mm/yyyy" />
              {errors.thangLuong && <span className="text-xs text-red-500 mt-1">{errors.thangLuong}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Lương cơ bản</label>
              <input className={`border rounded px-2 py-1 ${errors.luongCoBan ? 'border-red-500' : ''}`} type="number" min="0" name="luongCoBan" value={form.luongCoBan ?? ''} onChange={handleChange} placeholder="Lương cơ bản" />
              {errors.luongCoBan && <span className="text-xs text-red-500 mt-1">{errors.luongCoBan}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Số giờ OT</label>
              <input className={`border rounded px-2 py-1 ${errors.soGioOT ? 'border-red-500' : ''}`} type="number" min="0" name="soGioOT" value={form.soGioOT ?? ''} onChange={handleChange} placeholder="Số giờ OT" />
              {errors.soGioOT && <span className="text-xs text-red-500 mt-1">{errors.soGioOT}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Số ngày nghỉ có phép</label>
              <input className={`border rounded px-2 py-1 ${errors.soNgayNghiCoPhep ? 'border-red-500' : ''}`} type="number" min="0" name="soNgayNghiCoPhep" value={form.soNgayNghiCoPhep ?? ''} onChange={handleChange} placeholder="Số ngày nghỉ có phép" />
              {errors.soNgayNghiCoPhep && <span className="text-xs text-red-500 mt-1">{errors.soNgayNghiCoPhep}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Số ngày nghỉ không phép</label>
              <input className={`border rounded px-2 py-1 ${errors.soNgayNghiKhongPhep ? 'border-red-500' : ''}`} type="number" min="0" name="soNgayNghiKhongPhep" value={form.soNgayNghiKhongPhep ?? ''} onChange={handleChange} placeholder="Số ngày nghỉ không phép" />
              {errors.soNgayNghiKhongPhep && <span className="text-xs text-red-500 mt-1">{errors.soNgayNghiKhongPhep}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Tiền OT</label>
              <input className={`border rounded px-2 py-1 ${errors.tienOT ? 'border-red-500' : ''}`} type="number" min="0" name="tienOT" value={form.tienOT ?? ''} onChange={handleChange} placeholder="Tiền OT" />
              {errors.tienOT && <span className="text-xs text-red-500 mt-1">{errors.tienOT}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Phụ cấp</label>
              <input className={`border rounded px-2 py-1 ${errors.phuCap ? 'border-red-500' : ''}`} type="number" min="0" name="phuCap" value={form.phuCap ?? ''} onChange={handleChange} placeholder="Phụ cấp" />
              {errors.phuCap && <span className="text-xs text-red-500 mt-1">{errors.phuCap}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Thưởng</label>
              <input className={`border rounded px-2 py-1 ${errors.tienThuong ? 'border-red-500' : ''}`} type="number" min="0" name="tienThuong" value={form.tienThuong ?? ''} onChange={handleChange} placeholder="Thưởng" />
              {errors.tienThuong && <span className="text-xs text-red-500 mt-1">{errors.tienThuong}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Khấu trừ</label>
              <input className={`border rounded px-2 py-1 ${errors.khauTru ? 'border-red-500' : ''}`} type="number" min="0" name="khauTru" value={form.khauTru ?? ''} onChange={handleChange} placeholder="Khấu trừ" />
              {errors.khauTru && <span className="text-xs text-red-500 mt-1">{errors.khauTru}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Tổng lương</label>
              <input className={`border rounded px-2 py-1 ${errors.tongLuong ? 'border-red-500' : ''}`} type="number" min="0" name="tongLuong" value={form.tongLuong ?? ''} onChange={handleChange} placeholder="Tổng lương" />
              {errors.tongLuong && <span className="text-xs text-red-500 mt-1">{errors.tongLuong}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Sản lượng</label>
              <input className={`border rounded px-2 py-1 ${errors.sanLuong ? 'border-red-500' : ''}`} type="number" min="0" name="sanLuong" value={form.sanLuong ?? ''} onChange={handleChange} placeholder="Sản lượng" />
              {errors.sanLuong && <span className="text-xs text-red-500 mt-1">{errors.sanLuong}</span>}
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xs font-medium mb-1">Trạng thái</label>
              <select className="border rounded px-2 py-1" name="trangThaiDuyetLuong" value={form.trangThaiDuyetLuong || ''} onChange={handleChange}>
                <option value="Chờ xử lý">Chờ xử lý</option>
                <option value="Đã xử lý">Đã xử lý</option>
                <option value="Đã trả">Đã trả</option>
              </select>
              {errors.trangThaiDuyetLuong && <span className="text-xs text-red-500 mt-1">{errors.trangThaiDuyetLuong}</span>}
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>Hủy</Button>
            <Button type="submit" variant="default">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
