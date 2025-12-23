"use client";

import { useState } from "react";
import { Check, X, Filter, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockRequests } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function TeamLeaderRequestsPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  
  // Mock logic: Filter requests belonging to team members
  // In real app: filtered by API on toSanXuatID
  // For demo: Let's assume some requests in mockRequests belong to our team.
  // mockRequests currently doesn't link directly to team, but we can assume based on user ID or just show all for demo.
  // Let's filter by status for the 'processing' ones mainly.
  const requests = mockRequests.filter(r => {
    if (filter === 'all') return true;
    return r.trangThaiDonOT === filter; // Using OT status field as generic status for demo
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Duyệt yêu cầu</h1>
          <p className="text-gray-500">Xử lý yêu cầu nghỉ phép và tăng ca của nhân viên.</p>
        </div>
        <div className="flex gap-2">
           <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
            >
                <option value="pending">Chờ xử lý</option>
                <option value="approved">Đã duyệt</option>
                <option value="rejected">Đã từ chối</option>
                <option value="all">Tất cả</option>
           </select>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
               <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                    {request.nguoiYeuCau?.fullName?.charAt(0) || "U"}
               </div>
               <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{request.nguoiYeuCau?.fullName}</h3>
                        <Badge className={`
                            ${request.trangThaiDonOT === 'processing' ? 'bg-amber-100 text-amber-700' : 
                              request.trangThaiDonOT === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                        `}>
                            {request.trangThaiDonOT === 'processing' ? 'Chờ duyệt' : 
                             request.trangThaiDonOT === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                        Xin tăng ca <span className="font-medium text-gray-900">{request.soGio} giờ</span> • {new Date(request.ngayTangCa).toLocaleDateString('vi-VN')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Gửi lúc: {new Date(request.created_at).toLocaleString('vi-VN')}
                    </p>
               </div>
            </div>

            {request.trangThaiDonOT === 'processing' && (
                <div className="flex items-center gap-2 self-end md:self-auto">
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-1">
                        <X className="h-4 w-4" /> Từ chối
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
                        <Check className="h-4 w-4" /> Duyệt
                    </Button>
                </div>
            )}
          </div>
        ))}

        {requests.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                <p className="text-gray-500">Không có yêu cầu nào.</p>
            </div>
        )}
      </div>
    </div>
  );
}
