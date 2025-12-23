"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  DollarSign,
  FileText,
  User,
  MessageSquare,
  Bell,
  LogOut,
  type LucideIcon,
  LayoutDashboard,
  Calendar,
  Package,
  Settings,
  SquarePen,
  Briefcase
} from "lucide-react";

type SidebarItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  count?: number | null;
};

// Công nhân
const employeeSidebarItems: SidebarItem[] = [
  { icon: Home, label: "Trang chủ", href: "/employee/dashboard" },
  { icon: Calendar, label: "Lịch làm việc", href: "/employee/schedule" },
  { icon: User, label: "Hồ sơ", href: "/employee/profile" },
];

// Nhân sự
const hrSidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Tổng quan", href: "/hr/dashboard" },
  { icon: Users, label: "Nhân sự", href: "/hr/employees" },
  { icon: FileText, label: "Hợp đồng SX", href: "/hr/contracts" },
  { icon: Users, label: "Hợp đồng LĐ", href: "/hr/labor-contracts" },
  { icon: Package, label: "Sản phẩm", href: "/hr/products" },
];

// Tổ trưởng
const teamLeaderSidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Tổng quan", href: "/team-leader/dashboard" },
  { icon: Users, label: "Quản lý lịch làm", href: "/team-leader/manage-schedule" },
  { icon: FileText, label: "Duyệt yêu cầu", href: "/team-leader/requests", count: 3 },
  { icon: DollarSign, label: "Duyệt lương", href: "/team-leader/payroll-approval" },
  { icon: Package, label: "Yêu cầu vật tư", href: "/team-leader/material-requests" },
];

// Kế toán
const accountantSidebarItems: SidebarItem[] = [
  { icon: SquarePen, label: "Bảng lương", href: "/Accountant/EditPayroll" },
  { icon: MessageSquare, label: "Phản hồi lương", href: "/Accountant/EditPayrollRequests", count: 2 },
];

// Ban quản lý xưởng
const factoryManagementSidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Thống kê", href: "/FactoryManager/Dashboard" },
  { icon: LayoutDashboard, label: "Phân công hợp đồng", href: "/FactoryManager/ContractAllocation" },
  { icon: LayoutDashboard, label: "Phân tổ công nhân", href: "/FactoryManager/WorkerGrouping" },
  { icon: LayoutDashboard, label: "Yêu cầu", href: "/FactoryManager/Requests" },
  { icon: LayoutDashboard, label: "Quản lý nhân viên", href: "/FactoryManager/WorkerManagement" },
];

// Kho
const warehouseSidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Vật liệu", href: "/warehouse/materials" },
  { icon: Package, label: "Yêu cầu vật liệu", href: "/warehouse/requests" },
];

// Removed "Requests" and "Settings" from here as per previous tasks
const secondaryItems: SidebarItem[] = [];

export function Sidebar() {
  const pathname = usePathname();
  const isHr = pathname.startsWith("/hr");
  const isTeamLeader = pathname.startsWith("/team-leader");
  const isEmployee = pathname.startsWith("/employee");
  const isAccountant = pathname.startsWith("/Accountant");
  const isFactoryManager = pathname.startsWith("/FactoryManager");
  const isWarehouse = pathname.startsWith("/warehouse");

  const sidebarItems = isHr 
    ? hrSidebarItems 
    : isTeamLeader
      ? teamLeaderSidebarItems
      : isAccountant 
        ? accountantSidebarItems 
        : isEmployee
          ? employeeSidebarItems
          : isFactoryManager
            ? factoryManagementSidebarItems
            : isWarehouse
              ? warehouseSidebarItems
              : employeeSidebarItems;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r">
      <div className="flex h-full flex-col px-4 py-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2 px-2">
            <div className="relative h-12 w-full flex items-center">
             <span className="text-2xl font-extrabold text-blue-950 flex items-center">
                <span className="text-blue-600 mr-1">KateceHR</span>
                <span className="bg-blue-600 text-white rounded-md px-2 py-0.5 text-sm ml-1 font-bold">HR</span>
             </span>
            </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-gray-400")} />
                <span className="flex-1">{item.label}</span>
                {typeof item.count === "number" && item.count > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="mt-8 border-t pt-4 space-y-2">
            {/* Empty for now */}
        </div>

        {/* User Profile */}
        <div className="mt-auto pt-8">
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 border-2 border-white shadow-sm">
              <img
                src={isHr ? "https://i.pravatar.cc/150?u=sarah" : isTeamLeader ? "https://i.pravatar.cc/150?u=mike" : "https://i.pravatar.cc/150?u=alex"}
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-gray-800">
                {isHr ? "Nguyễn Văn B" : isTeamLeader ? "Trần Thị C (Tổ trưởng)" : "Nguyễn Văn A"}
              </p>
               <Link href={isHr ? "/hr/profile" : isTeamLeader ? "/team-leader/profile" : "/employee/profile"} className="text-xs font-medium text-gray-500 hover:text-blue-600 flex items-center gap-2 pl-1 mb-1 mt-1">
                  <User className="h-3 w-3" />
                  Xem hồ sơ
              </Link>
               {(isHr || isTeamLeader) && (
                  <>
                    <Link href={isHr ? "/hr/income" : "/team-leader/income"} className="text-xs font-medium text-gray-500 hover:text-blue-600 flex items-center gap-2 pl-1 mb-1">
                        <DollarSign className="h-3 w-3" />
                        Thu nhập
                    </Link>
                     <Link href={isHr ? "/hr/my-schedule" : "/team-leader/my-schedule"} className="text-xs font-medium text-gray-500 hover:text-blue-600 flex items-center gap-2 pl-1 mb-1">
                        <Calendar className="h-3 w-3" />
                        Lịch chấm công
                    </Link>
                  </>
               )}
               <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors mt-2">
                <LogOut className="h-3 w-3" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
