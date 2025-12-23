"use client";

import { useState } from "react";
import { Check, X, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockRequests, mockFeedbacks, mockEmployees } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function FactoryManagerRequestsPage() {
	const [filter, setFilter] = useState<'all' | 'processing' | 'approved' | 'declined'>('processing');

	// Chỉ lấy request/feedback từ các vị trí đặc biệt
	const allowedPositions = ["Tổ trưởng", "Quản lý nhân sự", "Kế toán", "Kho"];
	const allowedIds = mockEmployees
		.filter(e => allowedPositions.includes(e.position))
		.map(e => e.id);

	const allItems = [
		...mockRequests.filter(r => allowedIds.includes(r.nguoiGuiID || "")).map(r => ({
				type: 'OT' as const,
				id: r.id,
				date: r.created_at,
				status: r.trangThaiDonOT as string,
				senderId: r.nguoiGuiID,
				sender: r.NguoiGui || mockEmployees.find(e => e.id === r.nguoiGuiID),
				data: r
		})),
		...mockFeedbacks.filter(f => allowedIds.includes(f.nguoiGuiID || "")).map(f => ({
				type: 'FEEDBACK' as const,
				id: f.id,
				date: f.created_at,
				status: f.trangThaiPhanHoi === 'resolved' ? 'approved' : f.trangThaiPhanHoi,
				senderId: f.nguoiGuiID,
				sender: mockEmployees.find(e => e.id === f.nguoiGuiID),
				data: f
		}))
	];

	const filteredItems = allItems.filter(item => {
		if (filter === 'all') return true;
		return item.status === filter;
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-gray-900">Duyệt yêu cầu</h1>
					<p className="text-gray-500">Xử lý yêu cầu nghỉ phép, tăng ca và phản hồi lương.</p>
				</div>
				<div className="flex gap-2">
					 <select 
								className="border rounded-md px-3 py-2 text-sm"
								value={filter}
								onChange={(e) => setFilter(e.target.value as any)}
						>
								<option value="processing">Chờ xử lý</option>
								<option value="approved">Đã duyệt / Đã xử lý</option>
								<option value="declined">Đã từ chối</option>
								<option value="all">Tất cả</option>
					 </select>
				</div>
			</div>

			<div className="space-y-4">
				{filteredItems.map((item) => (
					<div key={`${item.type}-${item.id}`} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
						<div className="flex items-start gap-4">
							 {/* Avatar */}
							 <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
									 item.type === 'OT' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
							 }`}>
										{item.sender?.fullName?.charAt(0) || "U"}
							 </div>
							 {/* Content */}
							 <div>
										<div className="flex items-center gap-2">
												<h3 className="font-semibold text-gray-900">{item.sender?.fullName || "Người dùng"}</h3>
												<Badge className={`
														${item.status === 'processing' ? 'bg-amber-100 text-amber-700' : 
															item.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
												`}>
														{item.status === 'processing' ? 'Chờ duyệt' : 
														 item.status === 'approved' ? (item.type === 'FEEDBACK' ? 'Đã xử lý' : 'Đã duyệt') : 'Từ chối'}
												</Badge>
												<Badge variant="outline" className="border-gray-200 text-gray-500 font-normal">
														{item.type === 'OT' ? 'Yêu cầu Tăng ca' : 'Phản hồi Lương'}
												</Badge>
										</div>
										<div className="mt-1">
												{item.type === 'OT' ? (
														<p className="text-sm text-gray-600">
																Xin tăng ca <span className="font-medium text-gray-900">{item.data.soGioOT} giờ</span> • {item.data.ngayOT ? new Date(item.data.ngayOT).toLocaleDateString('vi-VN') : 'N/A'}
														</p>
												) : (
														<p className="text-sm text-gray-600 flex items-start gap-1">
																<MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
																<span>"{item.data.noiDung}"</span>
														</p>
												)}
										</div>
										<p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
												<Clock className="h-3 w-3" /> Gửi lúc: {new Date(item.date).toLocaleString('vi-VN')}
										</p>
							 </div>
						</div>
						{/* Actions */}
								<div className="flex items-center gap-2 self-end md:self-auto">
										<Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-1" size="sm">
												<X className="h-4 w-4" /> Từ chối
										</Button>
										<Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1" size="sm">
												<Check className="h-4 w-4" /> Duyệt
										</Button>
								</div>
					</div>
				))}

				{filteredItems.length === 0 && (
						<div className="text-center py-12 bg-white rounded-xl border border-dashed">
								<p className="text-gray-500">Không có yêu cầu nào cần xử lý.</p>
						</div>
				)}
			</div>
		</div>
	);
}
