"use client";

import { useState } from "react";
import { Plus, Send, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MaterialRequestPage() {
  const [items, setItems] = useState<{name: string, quantity: number, unit: string}[]>([
      {name: "", quantity: 0, unit: "kg"}
  ]);

  const addItem = () => {
      setItems([...items, {name: "", quantity: 0, unit: "kg"}]);
  };

  const updateItem = (index: number, field: string, value: any) => {
      const newItems = [...items];
      (newItems[index] as any)[field] = value;
      setItems(newItems);
  };

  const handleSubmit = () => {
    alert("Đã gửi yêu cầu vật tư!");
    // Reset form or redirect
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Yêu cầu vật tư</h1>
        <p className="text-gray-500">Gửi yêu cầu cấp phát nguyên vật liệu cho tổ sản xuất.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
         <div className="space-y-6">
            <div className="grid gap-2">
                <Label>Lý do yêu cầu</Label>
                <Textarea placeholder="VD: Bổ sung cho đơn hàng #123 thiếu vải..." />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Danh sách vật tư</Label>
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="h-4 w-4" /> Thêm dòng
                    </Button>
                </div>
                
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="flex-1">
                                <Input 
                                    placeholder="Tên vật tư (VD: Vải Cotton Trắng)" 
                                    value={item.name}
                                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="w-32">
                                <Input 
                                    type="number" 
                                    placeholder="Số lượng" 
                                    value={item.quantity}
                                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                />
                            </div>
                            <div className="w-24">
                                <select 
                                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                                    value={item.unit}
                                    onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                >
                                    <option value="kg">kg</option>
                                    <option value="mét">mét</option>
                                    <option value="cuộn">cuộn</option>
                                    <option value="cái">cái</option>
                                    <option value="thùng">thùng</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8">
                    <Send className="h-4 w-4" />
                    Gửi yêu cầu
                </Button>
            </div>
         </div>
      </div>

      <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Lịch sử yêu cầu gần đây</h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="divide-y">
                    {/* Mock Item 1 */}
                    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                 <Package className="h-5 w-5" />
                             </div>
                             <div>
                                 <h4 className="font-medium text-gray-900">Vải Kaki + Chỉ may</h4>
                                 <p className="text-sm text-gray-500">Cho đơn hàng #K-2023-001</p>
                             </div>
                        </div>
                        <div className="text-right">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                 Đang duyệt
                             </span>
                             <p className="text-xs text-gray-400 mt-1 flex items-center justify-end gap-1">
                                 <Clock className="h-3 w-3" /> 2 giờ trước
                             </p>
                        </div>
                    </div>
                     {/* Mock Item 2 */}
                    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                 <Package className="h-5 w-5" />
                             </div>
                             <div>
                                 <h4 className="font-medium text-gray-900">Kim may công nghiệp</h4>
                                 <p className="text-sm text-gray-500">Bổ sung kho tổ</p>
                             </div>
                        </div>
                        <div className="text-right">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                 Đã cấp
                             </span>
                             <p className="text-xs text-gray-400 mt-1 flex items-center justify-end gap-1">
                                 <Clock className="h-3 w-3" /> 1 ngày trước
                             </p>
                        </div>
                    </div>
                </div>
          </div>
      </div>
    </div>
  );
}
