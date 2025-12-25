"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateRequestModal } from "@/components/create-request-modal";

export default function RequestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yêu cầu của tôi</h1>
          <p className="text-gray-500">Quản lý các yêu cầu nghỉ phép và tăng ca.</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Tạo yêu cầu
        </Button>
      </div>

      <div className="grid gap-4">
        {/* Request Card 1 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Nghỉ ốm</h3>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Đang chờ duyệt</Badge>
            </div>
            <p className="text-sm text-gray-500">Xin nghỉ từ 20/10 - 21/10</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            Gửi ngày 18/10
          </div>
        </div>

        {/* Request Card 2 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Duyệt tăng ca</h3>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Đã duyệt</Badge>
            </div>
            <p className="text-sm text-gray-500">4 giờ ngày 14/10</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            Gửi ngày 15/10
          </div>
        </div>

        {/* Request Card 3 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm opacity-60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Làm việc từ xa</h3>
              <Badge variant="destructive" className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200">Từ chối</Badge>
            </div>
            <p className="text-sm text-gray-500">Yêu cầu làm việc từ xa cả tuần</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            Gửi ngày 01/10
          </div>
        </div>
      </div>

      <CreateRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
