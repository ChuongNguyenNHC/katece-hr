"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Calendar, FileText, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewContractPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    tenHopDongSX: "",
    ngayBatDau: "",
    ngayKetThuc: "",
  });

  const [items, setItems] = useState<{productID: string, congDoanID: string, quantity: number}[]>([
    { productID: "", congDoanID: "", quantity: 1 }
  ]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sanpham');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setItems([...items, { productID: "", congDoanID: "", quantity: 1 }]);
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updated = [...items];
    // @ts-ignore
    updated[index][field] = value;
    
    // If product changed, reset stage
    if (field === 'productID') {
        updated[index].congDoanID = "";
    }
    
    setItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/hopdongsx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          items: items.filter(item => item.productID !== "")
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Không thể tạo hợp đồng");
      }

      const result = await response.json();
      console.log("Contract created:", result);
      router.push('/hr/contracts');
    } catch (error: any) {
      console.error("Error creating contract:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
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
                        value={formData.tenHopDongSX}
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
                        value={formData.ngayBatDau}
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
                        value={formData.ngayKetThuc}
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
                {items.map((item, index) => {
                    const selectedProduct = products.find((p: any) => p.id === item.productID);
                    return (
                        <div key={index} className="flex flex-col md:flex-row gap-4 items-end p-4 bg-gray-50 rounded-lg border">
                            <div className="flex-1 space-y-2 w-full">
                                <label className="text-xs font-medium text-gray-500">Sản phẩm</label>
                                <select 
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                                    value={item.productID}
                                    onChange={(e) => handleItemChange(index, 'productID', e.target.value)}
                                    required
                                >
                                    <option value="">Chọn sản phẩm...</option>
                                    {products.map((p: any) => (
                                        <option key={p.id} value={p.id}>{p.tenSP}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 space-y-2 w-full">
                                <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                    <Layers className="h-3 w-3" />
                                    Công đoạn
                                </label>
                                <select 
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                                    value={item.congDoanID}
                                    onChange={(e) => handleItemChange(index, 'congDoanID', e.target.value)}
                                    required
                                    disabled={!item.productID}
                                >
                                    <option value="">Chọn công đoạn...</option>
                                    {selectedProduct?.stages?.map((s: any) => (
                                        <option key={s.id} value={s.id}>{s.tenCongDoan} ({(s.donGia ?? 0).toLocaleString()} đ)</option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-32 space-y-2 w-full md:w-32">
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
                    );
                })}
            </div>
        </div>

        <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>Hủy</Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8"
              disabled={isSubmitting}
            >
                {isSubmitting ? (
                  <>Đang lưu...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Lưu hợp đồng
                  </>
                )}
            </Button>
        </div>
      </form>
    </div>
  );
}
