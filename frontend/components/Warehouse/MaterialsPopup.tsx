import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { Vatlieu } from "@/types/schema";

export type MaterialsPopupProps = {
  open: boolean;
  onClose: () => void;
  data: Vatlieu | null;
  onSave: (data: Vatlieu) => void;
};

export default function MaterialsPopup({ open, onClose, data, onSave }: MaterialsPopupProps) {
  const emptyForm: Vatlieu = {
    id: "",
    tenVatLieu: "",
    soLuongTon: 0,
    donViTinh: "",
    nhaCungCapID: "",
    trangThai: undefined,
    CHITIETYEUCAUVATLIEU: [],
  };
  const [form, setForm] = useState<Vatlieu>(data || emptyForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setForm(data || emptyForm);
    setErrors({});
  }, [data, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!form) return;
    let newValue: any = value;
    if (name === "soLuongTon") {
      newValue = value === "" ? "" : Number(value);
    }
    setForm({ ...form, [name]: newValue });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (f: Vatlieu) => {
    const newErrors: { [key: string]: string } = {};
    if (!f.tenVatLieu || !f.tenVatLieu.trim()) newErrors.tenVatLieu = "Tên vật liệu không được để trống";
    if (f.soLuongTon === undefined || f.soLuongTon === null || (typeof f.soLuongTon === 'string' && f.soLuongTon === "")) newErrors.soLuongTon = "Số lượng tồn không được để trống";
    if (!f.donViTinh || !f.donViTinh.trim()) newErrors.donViTinh = "Đơn vị tính không được để trống";
    if (!f.nhaCungCapID || !f.nhaCungCapID.trim()) newErrors.nhaCungCapID = "Nhà cung cấp không được để trống";
    if (!f.trangThai) newErrors.trangThai = "Trạng thái không được để trống";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const formData: Vatlieu = { ...form };
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa vật liệu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col col-span-2">
              <label className="text-xs font-medium mb-1">Tên vật liệu</label>
              <input className={`border rounded px-2 py-1 ${errors.tenVatLieu ? 'border-red-500' : ''}`} name="tenVatLieu" value={form.tenVatLieu || ''} onChange={handleChange} placeholder="Tên vật liệu" />
              {errors.tenVatLieu && <span className="text-xs text-red-500 mt-1">{errors.tenVatLieu}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Số lượng tồn</label>
              <input className={`border rounded px-2 py-1 ${errors.soLuongTon ? 'border-red-500' : ''}`} type="number" min="0" name="soLuongTon" value={form.soLuongTon ?? ''} onChange={handleChange} placeholder="Số lượng tồn" />
              {errors.soLuongTon && <span className="text-xs text-red-500 mt-1">{errors.soLuongTon}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-medium mb-1">Đơn vị tính</label>
              <input className={`border rounded px-2 py-1 ${errors.donViTinh ? 'border-red-500' : ''}`} name="donViTinh" value={form.donViTinh || ''} onChange={handleChange} placeholder="Đơn vị tính" />
              {errors.donViTinh && <span className="text-xs text-red-500 mt-1">{errors.donViTinh}</span>}
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xs font-medium mb-1">Nhà cung cấp</label>
              <input className={`border rounded px-2 py-1 ${errors.nhaCungCapID ? 'border-red-500' : ''}`} name="nhaCungCapID" value={form.nhaCungCapID || ''} onChange={handleChange} placeholder="ID nhà cung cấp" />
              {errors.nhaCungCapID && <span className="text-xs text-red-500 mt-1">{errors.nhaCungCapID}</span>}
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-xs font-medium mb-1">Trạng thái</label>
              <select className={`border rounded px-2 py-1 ${errors.trangThai ? 'border-red-500' : ''}`} name="trangThai" value={form.trangThai || ''} onChange={handleChange}>
                <option value="">Chọn trạng thái</option>
                <option value="conHang">Còn Hàng</option>
                <option value="sapHet">Sắp hết</option>
                <option value="hetHang">Hết hàng</option>
                <option value="ngungSuDung">Ngừng sử dụng</option>
              </select>
              {errors.trangThai && <span className="text-xs text-red-500 mt-1">{errors.trangThai}</span>}
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
