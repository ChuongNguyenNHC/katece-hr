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
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/employee/dashboard" },
  { icon: FileText, label: "Requests", href: "/employee/requests", count: 2 },
  { icon: User, label: "Profile", href: "/employee/profile" },
];

const secondaryItems = [
  { icon: MessageSquare, label: "Support", href: "/employee/support" },
  {
    icon: Bell,
    label: "Notifications",
    href: "/employee/notifications",
    count: 5,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r">
      <div className="flex h-full flex-col px-4 py-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2 px-2">
            <div className="relative h-12 w-full flex items-center">
             <span className="text-2xl font-extrabold text-blue-950 flex items-center">
                <span className="text-blue-600 mr-1">Nexus</span>
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
                {item.count !== undefined && item.count > 0 && (
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
          {secondaryItems.map((item) => {
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
              <item.icon className="h-5 w-5 text-gray-400" />
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="flex px-2 py-0.5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {item.count}
                </span>
              )}
            </Link>
          )})}
        </div>

        {/* User Profile */}
        <div className="mt-auto pt-8">
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 border-2 border-white shadow-sm">
               {/* Avatar Placeholder */}
              <img
                src="https://github.com/shadcn.png" // Placeholder
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-gray-800">
                Alex Johnson
              </p>
              <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors">
                <LogOut className="h-3 w-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
