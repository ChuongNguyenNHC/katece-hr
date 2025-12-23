"use client";

import { useState } from "react";
import { ScheduleView } from "@/components/schedule-view";
import { IncomeOverview } from "@/components/income-overview";
import { AvailabilityModal } from "@/components/availability-modal";
import { Button } from "@/components/ui/button";
import { Settings, FileText, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TeamLeaderDashboardPage() {
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tổng quan tổ trưởng</h1>
            <p className="text-gray-500 mt-1">Quản lý đội nhóm và công việc cá nhân.</p>
         </div>
        <Button 
            onClick={() => setIsAvailabilityOpen(true)}
            variant="outline"
            className="gap-2"
        >
            <Settings className="h-4 w-4" />
            Đăng ký lịch làm
        </Button>
      </div>

      {/* Quick Stats / Actions for Management */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/team-leader/requests">
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-l-amber-500 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Yêu cầu cần duyệt</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground text-amber-600 font-medium">Cần xử lý ngay</p>
                </CardContent>
            </Card>
        </Link>
        <Link href="/team-leader/payroll-approval">
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-l-blue-500 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Lương chờ duyệt</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground text-blue-600 font-medium">Kỳ 16/11 - 15/12</p>
                </CardContent>
            </Card>
        </Link>
        <Link href="/team-leader/manage-schedule">
             <Card className="hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-l-emerald-500 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Nhân sự trong tổ</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">Đang làm việc</p>
                </CardContent>
            </Card>
        </Link>
      </div>

      {/* Personal Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Lịch làm việc của tôi</h2>
        <ScheduleView />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Thu nhập cá nhân</h2>
        <IncomeOverview />
      </div>

      <AvailabilityModal 
        isOpen={isAvailabilityOpen} 
        onClose={() => setIsAvailabilityOpen(false)} 
      />
    </div>
  );
}
