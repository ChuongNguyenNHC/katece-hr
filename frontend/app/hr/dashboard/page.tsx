"use client";

import { useState } from "react";
import { 
  Users, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  MapPin,
  Clock,
  Inbox
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScheduleView } from "@/components/schedule-view";
import { mockEmployees, mockContracts, mockRequests, mockProducts } from "@/lib/mock-data";

export default function HrDashboardPage() {
  // Calculate Stats
  const totalEmployees = mockEmployees.length;
  const activeContracts = mockContracts.filter(c => c.trangThaiHopDongSX === 'active').length;
  const pendingRequests = mockRequests.filter(r => r.trangThaiDonOT === 'processing').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tổng quan</h1>
          <p className="text-gray-500 mt-1">Tổng hợp hoạt động nhân sự và thống kê.</p>
        </div>
      </div>

      {/* Shift Cards / Schedule View */}
      <ScheduleView />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số công nhân</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">+4 so với tháng trước</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hợp đồng SX hoạt động</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeContracts}</div>
            <p className="text-xs text-muted-foreground">+2 mới trong tuần này</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yêu cầu chờ duyệt</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Cần xử lý</p>
          </CardContent>
        </Card>
         <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chấm công hôm nay</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">133 đã vào ca</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
                {/* Mock Activities */}
               {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        JD
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Minh Long đã gửi yêu cầu tăng ca</p>
                      <p className="text-xs text-muted-foreground">2 giờ trước</p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-blue-600 cursor-pointer hover:underline">Xem</div>
                  </div>
               ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Hợp đồng sắp hết hạn</CardTitle>
             <p className="text-xs text-muted-foreground">Hợp đồng hết hạn trong 30 ngày tới</p>
          </CardHeader>
          <CardContent>
              <div className="space-y-6">
                   {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                             <p className="text-sm font-medium">Nguyễn Văn A</p>
                             <p className="text-xs text-gray-500">Hết hạn: 24/10/2023</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs">Gia hạn</Button>
                    </div>
                   ))}
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LogOutIcon(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    )
}
