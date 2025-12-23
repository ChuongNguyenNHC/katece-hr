import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export type PayrollRow = {
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

type EditPayrollPopupProps = {
  open: boolean;
  onClose: () => void;
  data: PayrollRow | null;
  onSave: (data: PayrollRow) => void;
};


export default function EditPayrollPopup({ open, onClose, data, onSave }: EditPayrollPopupProps) {
  const [form, setForm] = useState<PayrollRow | null>(data);
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
    setForm({ ...form, [name]: value });
    // Validate realtime cho trường tháng
    if (name === "month") {
      let err = "";
      if (!value.trim()) {
        err = "Tháng không được để trống";
      } else if (isNaN(Number(value))) {
        err = "Tháng phải là số hợp lệ";
      } else if (Number(value) < 1 || Number(value) > 12) {
        err = "Tháng phải từ 1 đến 12";
      }
      setErrors((prev) => ({ ...prev, [name]: err }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Hàm validate form
  const validate = (f: PayrollRow) => {
    const newErrors: { [key: string]: string } = {};
    if (!f.name.trim()) newErrors.name = "Họ tên không được để trống";
    // Validate tháng
    if (!f.month.trim()) {
      newErrors.month = "Tháng không được để trống";
    } else if (isNaN(Number(f.month))) {
      newErrors.month = "Tháng phải là số hợp lệ";
    } else if (Number(f.month) < 1 || Number(f.month) > 12) {
      newErrors.month = "Tháng phải từ 1 đến 12";
    }
    // Validate năm
    if (!f.year.trim()) newErrors.year = "Năm không được để trống";
    else if (!/^\d{4}$/.test(f.year) || Number(f.year) < 1900 || Number(f.year) > 2100) newErrors.year = "Năm không hợp lệ";
    // Validate các trường số: không được để trống, không âm, phải là số hợp lệ
    const numberFields = [
      { key: "salary", label: "Lương cơ bản" },
      { key: "otHours", label: "Số giờ OT" },
      { key: "paidLeave", label: "Nghỉ có phép" },
      { key: "unpaidLeave", label: "Nghỉ không phép" },
      { key: "otPay", label: "Tiền OT" },
      { key: "allowance", label: "Phụ cấp" },
      { key: "bonus", label: "Thưởng" },
      { key: "deduction", label: "Khấu trừ" },
      { key: "total", label: "Tổng lương" },
    ];
    numberFields.forEach(({ key, label }) => {
      const val = f[key as keyof PayrollRow]?.toString().trim();
      if (!val || val === "") {
        newErrors[key] = `${label} không được để trống`;
      } else if (isNaN(Number(val))) {
        newErrors[key] = `${label} phải là số hợp lệ`;
      } else if (Number(val) < 0) {
        newErrors[key] = `${label} không được âm`;
      }
    });
    if (!f.status.trim()) newErrors.status = "Trạng thái không được để trống";
    return newErrors;
  };

  // Hàm submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    // Lấy giá trị mới nhất từ form inputs
    const formData: PayrollRow = { ...form };
    (Object.keys(formData) as (keyof PayrollRow)[]).forEach((key) => {
      if (typeof formData[key] === 'string') {
        formData[key] = formData[key].trim();
      }
    });
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
              <input className={`border rounded px-2 py-1 ${errors.name ? 'border-red-500' : ''}`} name="name" value={form.name} onChange={handleChange} placeholder="Họ tên" />
              {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Tháng</label>
              <input className={`border rounded px-2 py-1 ${errors.month ? 'border-red-500' : ''}`} type="number" min="1" max="12" name="month" value={form.month} onChange={handleChange} placeholder="Tháng" onInvalid={e => e.preventDefault()} />
              {errors.month && <span className="text-xs text-red-500 mt-1">{errors.month}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Năm</label>
              <input className={`border rounded px-2 py-1 ${errors.year ? 'border-red-500' : ''}`} type="number" min="1900" max="2100" name="year" value={form.year} onChange={handleChange} placeholder="Năm" onInvalid={e => e.preventDefault()} />
              {errors.year && <span className="text-xs text-red-500 mt-1">{errors.year}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Lương cơ bản</label>
              <input className={`border rounded px-2 py-1 ${errors.salary ? 'border-red-500' : ''}`} type="number" min="0" name="salary" value={form.salary} onChange={handleChange} placeholder="Lương cơ bản" onInvalid={e => e.preventDefault()} />
              {errors.salary && <span className="text-xs text-red-500 mt-1">{errors.salary}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Số giờ OT</label>
              <input className={`border rounded px-2 py-1 ${errors.otHours ? 'border-red-500' : ''}`} type="number" min="0" name="otHours" value={form.otHours} onChange={handleChange} placeholder="Số giờ OT" onInvalid={e => e.preventDefault()} />
              {errors.otHours && <span className="text-xs text-red-500 mt-1">{errors.otHours}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Nghỉ có phép</label>
              <input className={`border rounded px-2 py-1 ${errors.paidLeave ? 'border-red-500' : ''}`} type="number" min="0" name="paidLeave" value={form.paidLeave} onChange={handleChange} placeholder="Nghỉ có phép" onInvalid={e => e.preventDefault()} />
              {errors.paidLeave && <span className="text-xs text-red-500 mt-1">{errors.paidLeave}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Nghỉ không phép</label>
              <input className={`border rounded px-2 py-1 ${errors.unpaidLeave ? 'border-red-500' : ''}`} type="number" min="0" name="unpaidLeave" value={form.unpaidLeave} onChange={handleChange} placeholder="Nghỉ không phép" onInvalid={e => e.preventDefault()} />
              {errors.unpaidLeave && <span className="text-xs text-red-500 mt-1">{errors.unpaidLeave}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Tiền OT</label>
              <input className={`border rounded px-2 py-1 ${errors.otPay ? 'border-red-500' : ''}`} type="number" min="0" name="otPay" value={form.otPay} onChange={handleChange} placeholder="Tiền OT" onInvalid={e => e.preventDefault()} />
              {errors.otPay && <span className="text-xs text-red-500 mt-1">{errors.otPay}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Phụ cấp</label>
              <input className={`border rounded px-2 py-1 ${errors.allowance ? 'border-red-500' : ''}`} type="number" min="0" name="allowance" value={form.allowance} onChange={handleChange} placeholder="Phụ cấp" onInvalid={e => e.preventDefault()} />
              {errors.allowance && <span className="text-xs text-red-500 mt-1">{errors.allowance}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Thưởng</label>
              <input className={`border rounded px-2 py-1 ${errors.bonus ? 'border-red-500' : ''}`} type="number" min="0" name="bonus" value={form.bonus} onChange={handleChange} placeholder="Thưởng" onInvalid={e => e.preventDefault()} />
              {errors.bonus && <span className="text-xs text-red-500 mt-1">{errors.bonus}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Khấu trừ</label>
              <input className={`border rounded px-2 py-1 ${errors.deduction ? 'border-red-500' : ''}`} type="number" min="0" name="deduction" value={form.deduction} onChange={handleChange} placeholder="Khấu trừ" onInvalid={e => e.preventDefault()} />
              {errors.deduction && <span className="text-xs text-red-500 mt-1">{errors.deduction}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Tổng lương</label>
              <input className={`border rounded px-2 py-1 ${errors.total ? 'border-red-500' : ''}`} type="number" min="0" name="total" value={form.total} onChange={handleChange} placeholder="Tổng lương" onInvalid={e => e.preventDefault()} />
              {errors.total && <span className="text-xs text-red-500 mt-1">{errors.total}</span>}
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xs font-medium mb-1">Trạng thái</label>
              <select className="border rounded px-2 py-1" name="status" value={form.status} onChange={handleChange}>
                <option value="Chờ xử lý">Chờ xử lý</option>
                <option value="Đã xử lý">Đã xử lý</option>
                <option value="Đã trả">Đã trả</option>
              </select>
              {errors.status && <span className="text-xs text-red-500 mt-1">{errors.status}</span>}
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
