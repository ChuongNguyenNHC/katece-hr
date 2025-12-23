"use client";
import { mockMaterials } from "@/lib/mock-data";
import { Edit, Search, Trash, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import MaterialsPopup from "@/components/Warehouse/MaterialsPopup";
import { Vatlieu } from "@/types/schema";

const TRANG_THAI_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "conHang", label: "Còn Hàng" },
  { value: "sapHet", label: "Sắp hết" },
  { value: "hetHang", label: "Hết hàng" },
  { value: "ngungSuDung", label: "Ngừng sử dụng" },
];

export default function MaterialsPage() {
  const [filterStatus, setFilterStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editData, setEditData] = useState<Vatlieu | null>(null);
  const [materials, setMaterials] = useState(mockMaterials);
  const filteredMaterials = filterStatus
    ? materials.filter((vl) => vl.trangThai === filterStatus)
    : materials;

  const handleAddMaterial = () => {
    setEditData(null);
    setShowPopup(true);
  };

  const handleEditMaterial = (material: Vatlieu) => {
    setEditData(material);
    setShowPopup(true);
  };

  const handleSaveMaterial = (newMaterial: Vatlieu) => {
    if (editData) {
      setMaterials((prev) => prev.map((vl) => vl.id === editData.id ? { ...vl, ...newMaterial } : vl));
    } else {
      setMaterials((prev) => [
        { ...newMaterial, id: `vl${Date.now()}` },
        ...prev,
      ]);
    }
    setShowPopup(false);
    setEditData(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Danh sách vật liệu</h1>
          <p className="text-gray-500">Quản lý tồn kho vật liệu.</p>
        </div>
          <button
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"
            onClick={handleAddMaterial}
          >
            <Plus size={16} />
            Thêm vật liệu
          </button>
        
      </div>
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Tìm kiếm nhân viên..." 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
        </div>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {TRANG_THAI_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 font-medium border-b">
            <tr>
              <th className="px-6 py-4">Tên vật liệu</th>
              <th className="px-6 py-4">Số lượng tồn</th>
              <th className="px-6 py-4">Đơn vị tính</th>
              <th className="px-6 py-4">Nhà cung cấp</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredMaterials.map((vl) => (
              <tr key={vl.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">{vl.tenVatLieu}</td>
                <td className="px-6 py-4">{vl.soLuongTon}</td>
                <td className="px-6 py-4">{vl.donViTinh}</td>
                <td className="px-6 py-4">{vl.nhaCungCapID}</td>
                <td className="px-6 py-4">
                  {vl.trangThai === "conHang" && (
                    <Badge className="bg-green-100 text-green-700 border-green-200">Còn Hàng</Badge>
                  )}
                  {vl.trangThai === "sapHet" && (
                    <Badge className="bg-yellow-100 text-orange-800 border-yellow-200">Sắp hết</Badge>
                  )}
                  {vl.trangThai === "hetHang" && (
                    <Badge className="bg-red-100 text-red-700 border-red-200">Hết hàng</Badge>
                  )}
                  {vl.trangThai === "ngungSuDung" && (
                    <Badge className="bg-gray-200 text-gray-700 border-gray-300">Ngừng sử dụng</Badge>
                  )}
                  {!vl.trangThai && ""}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="inline-flex items-center px-2 py-1 text-blue-600 hover:text-blue-800" title="Sửa" onClick={() => handleEditMaterial(vl)}>
                    <Edit size={18} />
                  </button>
                  <button className="inline-flex items-center px-2 py-1 text-red-600 hover:text-red-800" title="Xóa">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MaterialsPopup
        open={showPopup}
        onClose={() => { setShowPopup(false); setEditData(null); }}
        data={editData}
        onSave={handleSaveMaterial}
      />
    </div>
  );
}
