"use client";

import { useState } from "react";
import { Check, X, Clock, Calendar, MessageSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Requests
const initialRequests = [
  {
    id: 1,
    employeeId: 1,
    name: "Alex Johnson",
    type: "Time Off",
    date: "Dec 20, 2024",
    reason: "Doctor's Appointment",
    status: "Pending",
    submitted: "2 hours ago",
    avatar: "AJ",
  },
  {
    id: 2,
    employeeId: 3,
    name: "Michael Brown",
    type: "Shift Swap",
    date: "Dec 22, 2024",
    reason: "Family Emergency",
    status: "Pending",
    submitted: "5 hours ago",
    avatar: "MB",
  },
  {
    id: 3,
    employeeId: 2,
    name: "Sarah Williams",
    type: "Time Off",
    date: "Dec 25 - Dec 30, 2024",
    reason: "Vacation",
    status: "Approved",
    submitted: "1 day ago",
    avatar: "SW",
  },
  {
    id: 4,
    employeeId: 4,
    name: "Emily Davis",
    type: "Overtime",
    date: "Dec 18, 2024",
    reason: "Project Deadline",
    status: "rejected",
    submitted: "2 days ago",
    avatar: "ED",
  },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("Pending");

  const handleAction = (id: number, action: "Approved" | "Rejected") => {
    setRequests(prev => prev.map(req => 
        req.id === id ? { ...req, status: action } : req
    ));
  };

  const filteredRequests = filter === "All" 
    ? requests 
    : requests.filter(r => r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Yêu cầu</h1>
          <p className="text-gray-500">Quản lý các yêu cầu từ công nhân.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
            {["Chờ duyệt", "Đã duyệt", "Đã từ chối", "Tất cả"].map((tab) => {
                const mapFilter = (t: string) => {
                    if (t === "Chờ duyệt") return "Pending";
                    if (t === "Đã duyệt") return "Approved";
                    if (t === "Đã từ chối") return "Rejected";
                    return "All";
                }
                const currentFilter = mapFilter(tab);
                return (
                <button
                    key={tab}
                    onClick={() => setFilter(currentFilter)}
                    className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-all",
                        filter === currentFilter 
                            ? "bg-white text-gray-900 shadow-sm" 
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                    )}
                >
                    {tab}
                </button>
            )})}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white p-6 rounded-lg shadow-sm border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                        {request.avatar}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                            <span className={cn(
                                "px-2 py-0.5 rounded text-xs font-medium border",
                                request.type === "Time Off" ? "bg-purple-50 text-purple-700 border-purple-100" :
                                request.type === "Shift Swap" ? "bg-orange-50 text-orange-700 border-orange-100" :
                                "bg-blue-50 text-blue-700 border-blue-100"
                            )}>
                                {request.type === "Time Off" ? "Nghỉ phép" : request.type === "Shift Swap" ? "Đổi ca" : "Tăng ca"}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                             <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {request.date}
                             </div>
                             <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                Đã gửi {request.submitted.replace("hours ago", "giờ trước").replace("day ago", "ngày trước").replace("days ago", "ngày trước")}
                             </div>
                        </div>
                        <div className="mt-3 flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                            <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                            <p>"{request.reason}"</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                    {request.status === "Pending" ? (
                        <>
                            <Button 
                                variant="outline" 
                                className="flex-1 md:flex-none border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                onClick={() => handleAction(request.id, "Rejected")}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Từ chối
                            </Button>
                            <Button 
                                className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => handleAction(request.id, "Approved")}
                            >
                                <Check className="h-4 w-4 mr-2" />
                                Duyệt
                            </Button>
                        </>
                    ) : (
                        <div className={cn(
                            "px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2",
                            request.status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                        )}>
                            {request.status === "Approved" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            {request.status === "Approved" ? "Đã duyệt" : "Đã từ chối"}
                        </div>
                    )}
                </div>
            </div>
        ))}

        {filteredRequests.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                <div className="text-gray-400 mb-2">
                    <Filter className="h-10 w-10 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Không tìm thấy yêu cầu nào</h3>
                <p className="text-gray-500">Hiện tại không có yêu cầu nào.</p>
            </div>
        )}
      </div>
    </div>
  );
}
