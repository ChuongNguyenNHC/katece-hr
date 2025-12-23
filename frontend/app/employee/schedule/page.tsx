"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockAttendance } from "@/lib/mock-data";

export default function EmployeeSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Calculate blank days at the start of the month for grid alignment
  const startDay = getDay(monthStart); // 0 (Sunday) to 6 (Saturday)
  // In Vietnam, week often starts on Monday, but standard calendar view often starts Sunday. 
  // Let's assume standard Sunday start for simplicity, or adjust for Monday start.
  // getDay returns 0 for Sunday.
  
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }

  // Get attendance for a specific date
  // In a real app, strict filtering by logged-in user ID is required.
  // For this demo, we can show data for User "1" (Worker) or "2" (HR/Manager)
  // Let's default to showing either to ensure data appears.
  const getAttendanceForDate = (date: Date) => {
    return mockAttendance.find(a => {
        if (!a.checkInTime) return false;
        const checkIn = new Date(a.checkInTime);
        // Match date AND (User 1 OR User 2) for demo visibility
        return isSameDay(checkIn, date) && (a.nhanVienID === "1" || a.nhanVienID === "2");
    });
  };

  const selectedAttendance = selectedDate ? getAttendanceForDate(selectedDate) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Lịch làm việc & Chấm công</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>Hôm nay</Button>
            <div className="flex items-center rounded-md border bg-white shadow-sm">
                <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-r-none border-r">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="px-4 py-1 text-sm font-medium min-w-[140px] text-center">
                    {format(currentDate, "MMMM yyyy", { locale: vi })}
                </div>
                <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-l-none border-l">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
            {/* Days Header */}
            <div className="grid grid-cols-7 mb-4">
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, i) => (
                    <div key={i} className="text-center text-sm font-semibold text-gray-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {/* Empty slots for previous month days */}
                {Array.from({ length: startDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50/50 rounded-lg border border-transparent"></div>
                ))}

                {daysInMonth.map((date) => {
                    const attendance = getAttendanceForDate(date);
                    const isToday = isSameDay(date, new Date());
                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                    
                    let statusColor = "bg-gray-100";
                    let statusText = "";
                    
                    if (attendance) {
                        statusColor = "bg-green-100 border-green-200 text-green-700";
                        statusText = "Có mặt";
                    }

                    // Simple "Absent" logic for past days without attendance
                    if (!attendance && date < new Date() && !isToday && date.getDay() !== 0) { // Exclude Sundays?
                        statusColor = "bg-red-50 border-red-100 text-red-600";
                        statusText = "Vắng";
                    }

                    // Future days
                    if (date > new Date()) {
                        statusColor = "bg-white";
                        statusText = "";
                    }

                    return (
                        <div 
                            key={date.toString()}
                            onClick={() => setSelectedDate(date)}
                            className={`
                                h-24 md:h-32 p-2 rounded-lg border cursor-pointer transition-all hover:shadow-md relative
                                ${isSelected ? "ring-2 ring-blue-500 border-blue-500 z-10" : "border-gray-200"}
                                ${isToday ? "bg-blue-50/50" : "bg-white"}
                            `}
                        >
                            <span className={`
                                text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full
                                ${isToday ? "bg-blue-600 text-white" : "text-gray-700"}
                            `}>
                                {format(date, "d")}
                            </span>

                            <div className="mt-2 space-y-1">
                                {statusText && (
                                    <div className={`text-xs px-2 py-1 rounded-md border ${statusColor} text-center truncate`}>
                                        {statusText}
                                    </div>
                                )}
                                {attendance?.checkInTime && (
                                    <div className="text-[10px] text-gray-500 text-center">
                                        {format(new Date(attendance.checkInTime), "HH:mm")}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
                Chi tiết ngày {selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
            </h2>

            {selectedAttendance ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                            <div className="flex items-center gap-2 text-green-700 mb-1">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm font-medium">Giờ vào</span>
                            </div>
                            <p className="text-xl font-bold text-green-800">
                                {selectedAttendance.checkInTime ? format(new Date(selectedAttendance.checkInTime), "HH:mm") : "--:--"}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-orange-50 border border-orange-100">
                             <div className="flex items-center gap-2 text-orange-700 mb-1">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm font-medium">Giờ ra</span>
                            </div>
                            <p className="text-xl font-bold text-orange-800">
                                {selectedAttendance.checkOutTime ? format(new Date(selectedAttendance.checkOutTime), "HH:mm") : "--:--"}
                            </p>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg border bg-gray-50 space-y-3">
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Tổng giờ làm:</span>
                            <span className="font-medium text-gray-900">{selectedAttendance.soGioLam} giờ</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Trạng thái:</span>
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Đúng giờ</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Ca làm việc:</span>
                            <span className="font-medium text-gray-900">Ca sáng (08:00 - 17:00)</span>
                         </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500">
                    <CalendarPlaceholder className="h-16 w-16 mx-auto mb-3 opacity-20" />
                    <p>Không có dữ liệu chấm công</p>
                    <p className="text-sm">Vui lòng chọn ngày khác hoặc liên hệ quản lý.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

function CalendarPlaceholder({ className }: { className?: string }) {
    return (
        <svg 
            className={className} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.5}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
    )
}
