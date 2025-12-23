"use client";

import { useState } from "react";
import { Check, X, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockFeedbacks, mockEmployees } from "@/lib/mock-data";
import type { Phanhoiluong, Taikhoan } from "@/types/schema";
import { Badge } from "@/components/ui/badge";

export default function EditPayrollRequestsPage() {
	const [filter, setFilter] = useState<'all' | 'processing' | 'approved' | 'declined'>('all');


	type FeedbackListItem = {
		id: string;
		date: string;
		status: string;
		senderId: string;
		sender?: Taikhoan;
		data: Phanhoiluong;
	};

	const allItems: FeedbackListItem[] = mockFeedbacks
		.filter(f => f.trangThaiDuyet === 'teamLeaderApproved')
		.map(f => ({
			id: f.id,
			date: f.created_at,
			status: f.trangThaiPhanHoi === 'resolved' ? 'approved' : f.trangThaiPhanHoi || 'processing',
			senderId: f.nguoiGuiID!,
			sender: mockEmployees.find(e => e.id === f.nguoiGuiID),
			data: f
		}));

	const filteredItems = allItems.filter(item => {
		if (filter === 'all') return true;
		return item.status === filter;
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-gray-900">Phản hồi lương</h1>
					<p className="text-gray-500">Xử lý các phản hồi về bảng lương của nhân viên.</p>
				</div>
				<div className="flex gap-2">
					<select 
                        className="border rounded-md px-3 py-2 text-sm"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
					>
                        <option value="all">Tất cả</option>
                        <option value="processing">Chờ xử lý</option>
                        <option value="approved">Đã xử lý</option>
                        <option value="declined">Đã từ chối</option>
					</select>
				</div>
			</div>

			<div className="space-y-4">
				{filteredItems.map((item) => (
					<div key={item.id} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
						<div className="flex items-start gap-4">
							 {/* Avatar */}
							 <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs uppercase bg-purple-100 text-purple-600">
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
																{item.status === 'processing' ? 'Chờ xử lý' : 
																 item.status === 'approved' ? 'Đã xử lý' : 'Từ chối'}
												</Badge>
												<Badge className="bg-blue-100 text-blue-700 font-normal">Tổ trưởng đã duyệt</Badge>
												<Badge variant="outline" className="border-gray-200 text-gray-500 font-normal">
														Phản hồi Lương
												</Badge>
										</div>
										<div className="mt-1">
												<p className="text-sm text-gray-600 flex items-start gap-1">
														<MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
														<span>"{item.data.noiDung}"</span>
												</p>
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
										<Check className="h-4 w-4" /> Xử lý xong
								</Button>
						</div>
					</div>
				))}

				{filteredItems.length === 0 && (
						<div className="text-center py-12 bg-white rounded-xl border border-dashed">
								<p className="text-gray-500">Không có phản hồi nào cần xử lý.</p>
						</div>
				)}
			</div>
		</div>
	);
}
