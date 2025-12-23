"use client";

import { useState } from "react";
import { Clock, BadgeCheck, X, Check, Boxes, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockMaterialRequests, mockChitietyeucauvatlieu, mockMaterials, mockTeams } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "approved", label: "Đã duyệt" },
  { value: "declined", label: "Từ chối" },
];

export default function WarehouseRequestsPage() {
  const [filter, setFilter] = useState("");

  const allRequests = mockMaterialRequests.map((req) => ({
    ...req,
    details: mockChitietyeucauvatlieu.filter((ct) => ct.yeuCauVatLieuID === req.id),
  }));

  const filteredRequests = filter
    ? allRequests.filter((r) => r.trangThaiYeuCau === filter)
    : allRequests;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Yêu cầu vật liệu</h1>
          <p className="text-gray-500">Danh sách các yêu cầu vật liệu từ các bộ phận.</p>
        </div>
        <div>
          <select
            className="border rounded-md px-3 py-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <div key={req.id} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs uppercase bg-blue-100 text-blue-600">
                <Boxes className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">
                    {(() => {
                      // Lấy toSanXuatID trực tiếp từ req (Yeucauvatlieu)
                      const toSanXuatID = req.toSanXuatID;
                      const team = mockTeams.find(t => t.id === toSanXuatID);
                      return team ? team.tenTo : "Không rõ tổ";
                    })()}
                  </h3>
                  <Badge className={
                    req.trangThaiYeuCau === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : req.trangThaiYeuCau === "approved"
                      ? "bg-green-100 text-green-700"
                      : req.trangThaiYeuCau === "declined"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }>
                    {req.trangThaiYeuCau === "pending"
                      ? "Chờ xử lý"
                      : req.trangThaiYeuCau === "approved"
                      ? "Đã duyệt"
                      : req.trangThaiYeuCau === "declined"
                      ? "Từ chối"
                      : req.trangThaiYeuCau || "Khác"}
                  </Badge>
                </div>
                <div className="mt-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Gửi lúc: {new Date(req.created_at).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-700 mb-1">Chi tiết vật liệu:</div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {req.details.length === 0 && (
                      <li className="italic text-gray-400 flex items-center gap-1"><AlertCircle className="h-4 w-4" />Không có chi tiết vật liệu</li>
                    )}
                    {req.details.map((ct) => {
                      const material = mockMaterials.find((m) => m.id === ct.vatLieuID);
                      return (
                        <li key={ct.id} className="flex items-center gap-2">
                          <span className="font-semibold">{material?.tenVatLieu || ct.vatLieuID}</span>
                          <span className="text-xs text-gray-500">({ct.soLuong} {material?.donViTinh || ""})</span>
                          {ct.ghiChu && <span className="text-xs text-gray-400 italic">- {ct.ghiChu}</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {req.trangThaiYeuCau !== "approved" && (
              <div className="flex items-center gap-2 self-end md:self-auto">
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-1" size="sm">
                  <X className="h-4 w-4" /> Từ chối
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1" size="sm">
                  <Check className="h-4 w-4" /> Duyệt
                </Button>
              </div>
            )}
          </div>
        ))}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed">
            <p className="text-gray-500">Không có yêu cầu nào cần xử lý.</p>
          </div>
        )}
      </div>
    </div>
  );
}
