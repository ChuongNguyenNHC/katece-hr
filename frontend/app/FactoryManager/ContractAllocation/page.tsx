"use client";

import React, { useState, useMemo } from 'react';
import {
    mockContracts,
    mockTeams,
    mockProducts,
    mockStages,
    mockEmployees
} from '@/lib/mock-data';
import {
    Hopdongsx,
    Tosanxuat,
    Sanpham,
    Congdoan
} from '@/types/schema';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Kiểu dữ liệu cho state cục bộ
type AllocationMap = Record<string, string>; // { "productId-stageId": "teamId" }

export default function ContractAllocationPage() {
    const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
    const [allocations, setAllocations] = useState<AllocationMap>({});
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
    const [filterMonth, setFilterMonth] = useState<string>('all');
    const [filterYear, setFilterYear] = useState<string>('all');

    // Danh sách tháng cố định từ 1 đến 12
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

    // Lấy danh sách các năm có trong dữ liệu
    const availableYears = useMemo(() => {
        const years = new Set<string>();
        mockContracts.forEach(c => {
            if (c.ngayBatDau) {
                // Giả định định dạng ngày là YYYY-MM-DD
                const year = c.ngayBatDau.substring(0, 4);
                years.add(year);
            }
        });
        return Array.from(years).sort().reverse(); // Năm mới nhất lên đầu
    }, []);

    // State được tính toán (Derived state)
    const filteredContracts = useMemo(() => {
        return mockContracts.filter(c => {
            const matchStatus = filterStatus === 'all' || c.trangThaiHopDongSX === filterStatus;

            let matchMonth = true;
            if (filterMonth !== 'all') {
                if (c.ngayBatDau) {
                    const contractMonth = parseInt(c.ngayBatDau.split('-')[1]);
                    matchMonth = contractMonth === parseInt(filterMonth);
                } else {
                    matchMonth = false;
                }
            }

            let matchYear = true;
            if (filterYear !== 'all') {
                if (c.ngayBatDau) {
                    const contractYear = c.ngayBatDau.substring(0, 4);
                    matchYear = contractYear === filterYear;
                } else {
                    matchYear = false;
                }
            }

            return matchStatus && matchMonth && matchYear;
        });
    }, [filterStatus, filterMonth, filterYear]);

    const selectedContract = useMemo(() =>
        mockContracts.find(c => c.id === selectedContractId),
        [selectedContractId]);

    const contractProducts = useMemo(() => {
        if (!selectedContract) return [];

        // Lấy các sản phẩm duy nhất liên quan đến hợp đồng này thông qua PHANCONGSANXUAT
        // Trong mock-data, các mục PHANCONGSANXUAT có `sanPhamID`.
        const productIds = selectedContract.PHANCONGSANXUAT?.map(pcsx => pcsx.sanPhamID) || [];
        // Nếu không tìm thấy phân công cụ thể nào trong mock, fallback về tất cả sản phẩm cho mục đích demo
        if (productIds.length === 0) return mockProducts;

        return mockProducts.filter(p => productIds.includes(p.id));
    }, [selectedContract]);

    const handleAllocationChange = (productId: string, stageId: string, teamId: string) => {
        setAllocations(prev => ({
            ...prev,
            [`${productId}-${stageId}`]: teamId
        }));
    };

    const handleSave = () => {
        console.log("Saving allocations:", {
            contractId: selectedContractId,
            allocations
        });
        alert("Đã lưu phân công thành công! (Kiểm tra console để xem dữ liệu)");
    };

    return (
        <div className="container mx-auto p-4 h-[calc(100vh-theme(spacing.4))] flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Phân Công Sản Xuất</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
                {/* Sidebar Trái: Danh sách Hợp đồng */}
                <div className="md:col-span-3 flex flex-col gap-4 border-r pr-4 h-full overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg text-muted-foreground">Danh sách Hợp đồng</h2>
                    </div>

                    <div className="flex gap-2">
                        <select
                            className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Ngừng hoạt động</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <select
                            className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                            value={filterMonth}
                            onChange={(e) => setFilterMonth(e.target.value)}
                        >
                            <option value="all">Tất cả tháng</option>
                            {allMonths.map(month => (
                                <option key={month} value={month}>Tháng {month}</option>
                            ))}
                        </select>

                        <select
                            className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                        >
                            <option value="all">Tất cả năm</option>
                            {availableYears.map(year => (
                                <option key={year} value={year}>Năm {year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        {filteredContracts.map(contract => (
                            <div
                                key={contract.id}
                                onClick={() => setSelectedContractId(contract.id)}
                                className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedContractId === contract.id
                                    ? "bg-primary/10 border-primary"
                                    : "hover:bg-accent"
                                    }`}
                            >
                                <div className="font-medium">{contract.tenHopDongSX}</div>
                                <div className="text-sm text-muted-foreground flex justify-between mt-1">
                                    <span>{contract.ngayBatDau}</span>
                                    <Badge
                                        className={`
                                            ${contract.trangThaiHopDongSX === 'active' ? 'bg-green-100 text-green-700 border-transparent hover:bg-green-200' : ''}
                                            ${contract.trangThaiHopDongSX === 'inactive' ? 'bg-red-100 text-red-700 border-transparent hover:bg-red-200' : ''}
                                            px-4 py-1
                                        `}
                                    >
                                        {contract.trangThaiHopDongSX === 'active' ? 'Đang hoạt động' :
                                            contract.trangThaiHopDongSX === 'inactive' ? 'Ngừng hoạt động' : contract.trangThaiHopDongSX}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nội dung Phải: Khu vực Phân bổ */}
                <div className="md:col-span-9 flex flex-col gap-4 h-full overflow-y-auto pb-20">
                    {selectedContract ? (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Chi tiết phân công</CardTitle>
                                    <CardDescription>
                                        Hợp đồng: <span className="font-semibold text-foreground">{selectedContract.tenHopDongSX}</span>
                                        <br />
                                        Khách hàng: {selectedContract.tenKhachHang || "Chưa cập nhật"}
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Danh sách Sản phẩm để Phân bổ */}
                            <div className="space-y-6">
                                {contractProducts.map(product => (
                                    <Card key={product.id} className="overflow-hidden">
                                        <div className="bg-muted/50 p-4 border-b">
                                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                                📦 Sản phẩm: {product.tenSP}
                                            </h3>
                                        </div>
                                        <CardContent className="p-4 grid gap-4">
                                            {(!product.CONGDOAN || product.CONGDOAN.length === 0) ? (
                                                <div className="text-center text-muted-foreground py-4">
                                                    Sản phẩm này chưa được định nghĩa công đoạn sản xuất.
                                                </div>
                                            ) : (
                                                <div className="grid gap-4">
                                                    {product.CONGDOAN.map(stage => (
                                                        <div key={stage.id} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 border-b last:border-0 pb-4 last:pb-0">
                                                            <div>
                                                                <div className="font-medium">{stage.tenCongDoan}</div>
                                                                <div className="text-sm text-muted-foreground">Đơn giá: {stage.donGia?.toLocaleString()} VND</div>
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <Label htmlFor={`assign - ${product.id} -${stage.id} `} className="text-xs">Phân công tổ</Label>
                                                                <select
                                                                    id={`assign - ${product.id} -${stage.id} `}
                                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={allocations[`${product.id} -${stage.id} `] || ""}
                                                                    onChange={(e) => handleAllocationChange(product.id, stage.id, e.target.value)}
                                                                >
                                                                    <option value="">-- Chọn tổ sản xuất --</option>
                                                                    {mockTeams.map(team => (
                                                                        <option key={team.id} value={team.id}>
                                                                            {team.tenTo} (Tổ trưởng: {mockEmployees.find(e => e.id === team.toTruongID)?.fullName || "N/A"})
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="fixed bottom-6 right-6 flex gap-3">
                                <Button size="lg" onClick={handleSave} className="shadow-lg">
                                    Lưu phân công
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                            <div className="text-4xl mb-4">📋</div>
                            <p>Vui lòng chọn một hợp đồng từ danh sách bên trái để bắt đầu phân công.</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
