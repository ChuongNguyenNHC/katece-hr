"use client";
import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { mockContracts, mockMaterials, mockChitietyeucauvatlieu } from "@/lib/mock-data";

// Helper: Lấy tháng từ chuỗi ngày
const getMonth = (dateStr: string) => {
	const d = new Date(dateStr);
	return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
};

// 1. Tính vốn mua vật liệu theo tháng
const materialCostByMonth: Record<string, number> = {};
mockChitietyeucauvatlieu.forEach((ct) => {
	// Tìm vật liệu và yêu cầu vật liệu liên quan
	const material = mockMaterials.find((vl) => vl.id === ct.vatLieuID);
	// Tìm tháng từ yêu cầu vật liệu
	const ycvl = ct.yeuCauVatLieuID;
	// Giả sử id ycvl có thể map sang object có created_at (nếu cần, có thể import mockMaterialRequests)
	// Đơn giản hóa: lấy tháng từ ycvl (nếu có mockMaterialRequests thì lấy created_at)
	// Ở đây sẽ bỏ qua, gán hết vào 1 tháng mẫu
	const month = "2025-12";
	if (material && material.giaMua) {
		materialCostByMonth[month] = (materialCostByMonth[month] || 0) + ct.soLuong * material.giaMua;
	}
});

// 2. Tính doanh thu theo tháng (giá trị hợp đồng)
const revenueByMonth: Record<string, number> = {};
mockContracts.forEach((c) => {
	const month = getMonth(c.created_at);
	revenueByMonth[month] = (revenueByMonth[month] || 0) + (c.giaTriLuong || 0);
});

// 3. Số lượng hợp đồng theo tháng
const contractCountByMonth: Record<string, number> = {};
mockContracts.forEach((c) => {
	const month = getMonth(c.created_at);
	contractCountByMonth[month] = (contractCountByMonth[month] || 0) + 1;
});


// Lấy danh sách năm và tháng từ dữ liệu
const allMonths = Array.from(new Set([
	...Object.keys(materialCostByMonth),
	...Object.keys(revenueByMonth),
])).sort();
const allYears = Array.from(new Set(allMonths.map(m => m.split('-')[0]))).sort();


export default function DashboardCharts() {

	// Bộ lọc cho biểu đồ vốn & doanh thu
	const [selectedYear1, setSelectedYear1] = useState<string>("");
	const [selectedMonth1, setSelectedMonth1] = useState<string>("");
	// Bộ lọc cho biểu đồ số hợp đồng
	const [selectedYear2, setSelectedYear2] = useState<string>("");
	const [selectedMonth2, setSelectedMonth2] = useState<string>("");

	// Danh sách 12 tháng
	const monthsList = Array.from({ length: 12 }, (_, i) => {
		const m = (i + 1).toString().padStart(2, '0');
		return { key: m, value: m, label: m };
	});

	// Lọc dữ liệu cho biểu đồ vốn & doanh thu
	const filteredMonths1 = allMonths.filter(m => {
		if (selectedYear1 && selectedMonth1) return m === `${selectedYear1}-${selectedMonth1}`;
		if (selectedYear1) return m.startsWith(selectedYear1 + "-");
		return true;
	});

	let barChartData = filteredMonths1.map((month) => ({
		month,
		materialCost: (materialCostByMonth[month] || 0),
		materialCostStr: (materialCostByMonth[month] || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
		revenue: (revenueByMonth[month] || 0),
		revenueStr: (revenueByMonth[month] || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
	}));
	// Nếu chỉ có 1 tháng dữ liệu, thêm 1 điểm ảo ở tháng trước với giá trị 0
	if (barChartData.length === 1) {
		const cur = barChartData[0].month;
		const [y, m] = cur.split('-').map(Number);
		let prevMonth = m - 1;
		let prevYear = y;
		if (prevMonth === 0) {
			prevMonth = 12;
			prevYear = y - 1;
		}
		const prevMonthStr = `${prevYear}-${prevMonth.toString().padStart(2, '0')}`;
		barChartData = [
			{ month: prevMonthStr, materialCost: 0, materialCostStr: '0 ₫', revenue: 0, revenueStr: '0 ₫' },
			...barChartData
		];
	}

	// Lọc dữ liệu cho biểu đồ số hợp đồng
	const filteredMonths2 = allMonths.filter(m => {
		if (selectedYear2 && selectedMonth2) return m === `${selectedYear2}-${selectedMonth2}`;
		if (selectedYear2) return m.startsWith(selectedYear2 + "-");
		return true;
	});
	const lineChartData = filteredMonths2.map((month) => ({
		month,
		contracts: contractCountByMonth[month] || 0,
	}));

	return (
		<div className="space-y-8">
			{/* Tiêu đề trang dashboard */}
			<div className="mb-6">
				<h1 className="text-2xl font-bold">Thống kê tổng quan</h1>
				<p className="text-gray-600 mt-1">Theo dõi doanh thu, vốn vật liệu và số lượng hợp đồng theo tháng.</p>
			</div>
			{/* Bộ lọc cho biểu đồ vốn & doanh thu */}
			<div className="flex gap-4 items-end mb-2">
				<div>
					<label className="block text-sm font-medium mb-1">Năm</label>
					<select
						className="border rounded px-2 py-1"
						value={selectedYear1}
						onChange={e => {
							setSelectedYear1(e.target.value);
							setSelectedMonth1("");
						}}
					>
						<option value="">Tất cả</option>
						{allYears.map(y => (
							<option key={y} value={y}>{y}</option>
						))}
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Tháng</label>
					<select
						className="border rounded px-2 py-1"
						value={selectedMonth1}
						onChange={e => setSelectedMonth1(e.target.value)}
						// luôn cho phép chọn tháng
					>
						<option value="">Tất cả</option>
						{monthsList.map(m => (
							<option key={m.key} value={m.value}>{m.label}</option>
						))}
					</select>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow p-4">
				<h2 className="text-lg font-semibold mb-4">Vốn mua vật liệu & Doanh thu theo tháng</h2>
				{barChartData.length === 0 ? (
					<div className="flex items-center justify-center h-48 text-gray-500 text-lg">Không có dữ liệu</div>
				) : (
					<ResponsiveContainer width="100%" height={260}>
						<AreaChart data={barChartData} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis tickFormatter={(value) => value.toLocaleString("vi-VN")}/>
							<Tooltip formatter={(value, name) => {
								if (typeof value === 'number') {
									return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
								}
								return value;
							}} />
							<Legend formatter={(value) => {
								if (value === 'materialCost') return 'Vốn vật liệu (VNĐ)';
								if (value === 'revenue') return 'Doanh thu (VNĐ)';
								return value;
							}} />
							<Area type="monotone" dataKey="materialCost" stroke="#8884d8" fill="#8884d8" name="Vốn vật liệu" fillOpacity={0.3} />
							<Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" name="Doanh thu" fillOpacity={0.3} />
						</AreaChart>
					</ResponsiveContainer>
				)}
			</div>

			{/* Bộ lọc cho biểu đồ số hợp đồng */}
			<div className="flex gap-4 items-end mb-2">
				<div>
					<label className="block text-sm font-medium mb-1">Năm</label>
					<select
						className="border rounded px-2 py-1"
						value={selectedYear2}
						onChange={e => {
							setSelectedYear2(e.target.value);
							setSelectedMonth2("");
						}}
					>
						<option value="">Tất cả</option>
						{allYears.map(y => (
							<option key={y} value={y}>{y}</option>
						))}
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Tháng</label>
					<select
						className="border rounded px-2 py-1"
						value={selectedMonth2}
						onChange={e => setSelectedMonth2(e.target.value)}
						// luôn cho phép chọn tháng
					>
						<option value="">Tất cả</option>
						{monthsList.map(m => (
							<option key={m.key} value={m.value}>{m.label}</option>
						))}
					</select>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow p-4">
				<h2 className="text-lg font-semibold mb-4">Số lượng hợp đồng theo tháng</h2>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis allowDecimals={false} />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="contracts" stroke="#ff7300" name="Số hợp đồng" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
