"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEmployees, mockProducts } from "@/lib/mock-data";

export default function NewContractPage() {
  const router = useRouter();
  
  // Form State
  const [formData, setFormData] = useState({
    tenHopDongSX: "",
    nhanVienID: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    loaiLuong: "Fixed",
    giaTriLuong: 0,
  });

  const [items, setItems] = useState<{productID: string, quantity: number}[]>([
    { productID: "", quantity: 1 }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setItems([...items, { productID: "", quantity: 1 }]);
  };

  const handleItemChange = (index: number, field: 'productID' | 'quantity', value: string | number) => {
    const updated = [...items];
    // @ts-ignore
    updated[index][field] = value;
    setItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating Contract:", { ...formData, items });
    // Mock save delay
    setTimeout(() => router.push('/hr/contracts'), 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tạo Hợp đồng Sản xuất</h1>
           <p className="text-gray-500">Tạo hợp đồng mới và phân công sản phẩm.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Thông tin Chung
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên hợp đồng</label>
                    <input 
                        name="tenHopDongSX" 
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="vd: Lô hàng A-2023"
                        onChange={handleInputChange}
                    />
                </div>



                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />    
                        Ngày bắt đầu
                    </label>
                    <input 
                        type="date"
                        name="ngayBatDau"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        onChange={handleInputChange}
                    />
                </div>

                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />    
                        Ngày kết thúc
                    </label>
                     <input 
                        type="date"
                        name="ngayKetThuc"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>

        {/* Product Assignments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2 items-start">
                    <div className="p-1 bg-amber-100 rounded text-amber-600">
                        <Plus className="h-4 w-4" />
                    </div>
                    Danh sách Sản phẩm
                </h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                    Thêm mục
                </Button>
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-end p-4 bg-gray-50 rounded-lg border">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-medium text-gray-500">Sản phẩm</label>
                            <select 
                                className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                                value={item.productID}
                                onChange={(e) => handleItemChange(index, 'productID', e.target.value)}
                                required
                            >
                                <option value="">Chọn sản phẩm...</option>
                                {mockProducts.map(p => (
                                    <option key={p.id} value={p.id}>{p.tenSP}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-32 space-y-2">
                            <label className="text-xs font-medium text-gray-500">Số lượng</label>
                            <input 
                                type="number" 
                                min="1"
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                required
                            />
                        </div>
                        <button 
                            type="button" 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md mb-0.5"
                            onClick={() => handleRemoveItem(index)}
                            disabled={items.length === 1}
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>Hủy</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8">
                <Save className="h-4 w-4" />
                Lưu hợp đồng
            </Button>
        </div>
      </form>
    </div>
  );
}
