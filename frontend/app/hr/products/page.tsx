"use client";

import { useState, useEffect } from "react";
import { Plus, Package, Layers, Edit, Trash2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("Products");
  const [showNewModal, setShowNewModal] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [productName, setProductName] = useState("");
  const [newStages, setNewStages] = useState<{name: string, price: number}[]>([{name: "", price: 0}]);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStage = () => {
    setNewStages([...newStages, {name: "", price: 0}]);
  };

  const handleStageChange = (index: number, field: 'name' | 'price', value: string | number) => {
    const updated = [...newStages];
    if (field === 'name') updated[index].name = value as string;
    if (field === 'price') updated[index].price = value as number;
    setNewStages(updated);
  };

  const handleRemoveStage = (index: number) => {
    setNewStages(newStages.filter((_, i) => i !== index));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
     if (!productName.trim()) {
       alert("Vui lòng nhập tên sản phẩm");
       return;
     }

     setIsSubmitting(true);
     try {
       const response = await fetch('http://localhost:5000/api/sanpham', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           tenSP: productName,
           stages: newStages
            .filter(s => s.name.trim() !== "")
            .map(s => ({ tenCongDoan: s.name, donGia: s.price }))
         })
       });

       if (response.ok) {
         setShowNewModal(false);
         setProductName("");
         setNewStages([{name: "", price: 0}]);
         fetchProducts();
       } else {
         const err = await response.json();
         alert(err.error || "Lỗi khi tạo sản phẩm");
       }
     } catch (error) {
       console.error("Error creating product:", error);
       alert("Lỗi kết nối đến máy chủ");
     } finally {
       setIsSubmitting(false);
     }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Quản lý Sản phẩm May mặc</h1>
          <p className="text-gray-500">Quản lý các mẫu quần áo và công đoạn sản xuất.</p>
        </div>
        <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={() => setShowNewModal(true)}
        >
          <Plus className="h-4 w-4" />
          Sản phẩm Mới
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {["Products", "Stages"].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                    "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                    activeTab === tab 
                        ? "border-blue-600 text-blue-600" 
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
            >
                {tab === "Products" ? "Sản phẩm" : "Công đoạn"}
            </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border min-h-[400px]">
        {activeTab === "Products" && (
            <div className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {products.map((product: any) => (
                        <div key={product.id} className="border rounded-lg p-5 hover:shadow-md transition-all cursor-pointer group">
                             <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Package className="h-6 w-6" />
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Edit className="h-4 w-4" />
                                </button>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{product.tenSP}</h3>
                            <p className="text-sm text-gray-500 mb-4">Ngày tạo: {product.created_at?.split('T')[0]}</p>
                            
                            <div className="space-y-3">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Công đoạn ({product.stages?.length || 0})
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.stages?.map((stage: any) => (
                                        <span key={stage.id} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-xs font-medium text-gray-700" title={`Giá: ${stage.donGia}`}>
                                            {stage.tenCongDoan}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === "Stages" && (
            <div className="p-0">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Tên công đoạn</th>
                            <th className="px-6 py-4">Đơn giá</th>
                            <th className="px-6 py-4">Sản phẩm</th>
                            <th className="px-6 py-4 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.flatMap((p: any) => p.stages.map((s: any) => ({ ...s, productName: p.tenSP }))).map((stage: any) => {
                            return (
                                <tr key={stage.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                        <Layers className="h-4 w-4 text-gray-400" />
                                        {stage.tenCongDoan}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{(stage.donGia ?? 0).toLocaleString()} đ</td>
                                    <td className="px-6 py-4 text-gray-600">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                <Package className="h-3 w-3" />
                                                {stage.productName}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )}
      </div>

       {/* New Product Modal */}
       {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-lg font-bold">Sản phẩm Mới</h2>
                    <button onClick={() => setShowNewModal(false)}><X className="h-5 w-5 text-gray-500" /></button>
                </div>
                
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Tên sản phẩm</label>
                        <input 
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            placeholder="vd: Ghế văn phòng"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                         <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-gray-700">Các công đoạn sản xuất</label>
                            <Button variant="ghost" size="sm" onClick={handleAddStage} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                <Plus className="h-4 w-4 mr-1" /> Thêm công đoạn
                            </Button>
                        </div>
                        
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                            {newStages.map((stage: any, idx: number) => (
                                <div key={idx} className="flex gap-3 items-start p-3 bg-gray-50 rounded-md border">
                                    <div className="flex-1 space-y-1">
                                        <label className="text-xs text-gray-500">Tên công đoạn</label>
                                        <input 
                                            className="w-full px-2 py-1.5 border rounded-md text-sm" 
                                            placeholder="vd: Cắt vải"
                                            value={stage.name}
                                            onChange={(e) => handleStageChange(idx, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="w-32 space-y-1">
                                        <label className="text-xs text-gray-500">Đơn giá</label>
                                        <input 
                                            type="number"
                                            className="w-full px-2 py-1.5 border rounded-md text-sm" 
                                            placeholder="0"
                                            value={stage.price}
                                            onChange={(e) => handleStageChange(idx, 'price', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <button 
                                        className="mt-6 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                        onClick={() => handleRemoveStage(idx)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t">
                    <Button variant="outline" onClick={() => setShowNewModal(false)}>Hủy</Button>
                    <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2" 
                        onClick={handleCreate}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>Đang xử lý...</>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Tạo sản phẩm
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
       )}
    </div>
  );
}
