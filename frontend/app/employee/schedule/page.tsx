"use client";

import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockAttendance } from "@/lib/mock-data";
import { AvailabilityModal } from "@/components/availability-modal";

export default function EmployeeSchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [userId, setUserId] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [todayStatus, setTodayStatus] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schedules, setSchedules] = useState<any[]>([]);

    // Tải thông tin người dùng từ LocalStorage khi trang được tải
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("Stored user from localStorage:", storedUser); // LOG: Kiểm tra user đã lưu
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                console.log("Parsed user:", user); // LOG: User đã được parse
                if (user && user.id) {
                    console.log("Setting userId:", user.id); // LOG: Đang set userId
                    setUserId(user.id);
                } else {
                    console.error("User object missing 'id' property");
                }
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
            }
        } else {
            console.warn("No user found in localStorage");
        }
    }, []);

    // Lấy trạng thái chấm công hôm nay + lịch làm việc khi có userId
    useEffect(() => {
        if (userId) {
            fetchTodayStatus();
            fetchMySchedules();
        }
    }, [userId, isModalOpen]); // Reload schedules when modal closes (potentially saved new ones)

    const fetchMySchedules = async () => {
        if (!userId) return;
        try {
            const res = await fetch(`http://localhost:5000/api/lichlam/my-schedule?userId=${userId}`);
            const data = await res.json();
            if (data.data) {
                setSchedules(data.data);
            }
        } catch (e) {
            console.error("Failed to fetch schedules", e);
        }
    }

    // Hàm gọi API lấy trạng thái hôm nay
    async function fetchTodayStatus() {
        if (!userId) return;
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/chamcong/today?userId=${userId}`);
            const data = await res.json();

            if (data.status === 'checked_in' || data.status === 'checked_out') {
                setTodayStatus(data.data);
            } else {
                setTodayStatus(null);
            }
        } catch (error) {
            console.error("Failed to fetch status", error);
        } finally {
            setLoading(false);
        }
    }

    // ... (keep CheckIn/CheckOut implementations)

    const handleCheckIn = async (chiTietLichLamID: string) => {
        if (!userId) return alert('Vui lòng nhập User ID');
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/chamcong/check-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, chiTietLichLamID })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Check-in thành công!');
                fetchMySchedules(); // Refresh schedules to get updated attendance status
            } else {
                alert('Lỗi: ' + data.error);
            }
        } catch (error) {
            alert('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckOut = async (chiTietLichLamID: string) => {
        if (!userId) return alert('Vui lòng nhập User ID');
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/chamcong/check-out', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, chiTietLichLamID })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Check-out thành công!');
                fetchMySchedules();
            } else {
                alert('Lỗi: ' + data.error);
            }
        } catch (error) {
            alert('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };


    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Tính toán số ngày trống đầu tháng để căn chỉnh lịch
    const startDay = getDay(monthStart); // 0 (Sunday) to 6 (Saturday)

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
    }

    // Helper to find registered schedules for a date
    const getRegisteredSchedules = (date: Date) => {
        return schedules.filter(s => {
            if (!s.ngayLam) return false;
            // Parse date string YYYY-MM-DD from API
            const scheduleDate = new Date(s.ngayLam);
            return isSameDay(scheduleDate, date);
        });
    };

    // Xác định dữ liệu hiển thị trong panel chi tiết
    let selectedAttendanceDisplay = null;
    let selectedSchedulesInfo: { id: string; start: Date; end: Date; attendance: any }[] = [];

    if (selectedDate) {
        // 1. Get all registered schedules for this date
        const regSchedules = getRegisteredSchedules(selectedDate);
        selectedSchedulesInfo = regSchedules.map(reg => {
            if (reg.LICHLAM) {
                return {
                    id: reg.id,
                    start: new Date(reg.LICHLAM.gioBatDau),
                    end: new Date(reg.LICHLAM.gioKetThuc),
                    attendance: reg.CHAMCONG
                };
            }
            return null;
        }).filter((item): item is { id: string; start: Date; end: Date; attendance: any } => item !== null);

        // 2. Try to get actual attendance
        // Prioritize todayStatus if today
        if (isSameDay(selectedDate, new Date()) && todayStatus) {
            selectedAttendanceDisplay = {
                checkInTime: todayStatus.checkInTime,
                checkOutTime: todayStatus.checkOutTime,
                soGioLam: todayStatus.soGioLam,
                nhanVienID: userId
            };
        } else {
            // Find in mock data or past loaded data if you had it (currently removed mock call slightly)
            // BUT wait, we need to allow viewing attendance history if we had that API.
            // For now, let's keep mockAttendance fallback for past dates IF it matches our demo users
            const mock = mockAttendance.find(a => {
                if (!a.checkInTime) return false;
                const checkIn = new Date(a.checkInTime);
                return isSameDay(checkIn, selectedDate) && (a.nhanVienID === userId); // strict on userId now
            });
            if (mock) selectedAttendanceDisplay = mock;
        }
    }

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
                        {/* Ô trống cho các ngày của tháng trước */}
                        {Array.from({ length: startDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50/50 rounded-lg border border-transparent"></div>
                        ))}

                        {daysInMonth.map((date) => {
                            const isToday = isSameDay(date, new Date());
                            const isSelected = selectedDate && isSameDay(date, selectedDate);

                            // Ưu tiên: Dữ liệu thực hôm nay > Dữ liệu giả lập (Mock)
                            let displayAttendance = null;
                            if (isToday && todayStatus) {
                                // Map API response to UI simple structure
                                displayAttendance = {
                                    checkInTime: todayStatus.checkInTime,
                                    checkOutTime: todayStatus.checkOutTime,
                                    soGioLam: todayStatus.soGioLam,
                                    nhanVienID: userId
                                };
                            } else {
                                // Fallback to mock logic just to keep existing calendar view dots if wanted, 
                                // OR simply use this inline since function was removed.
                                // Let's inline the logic for simplicity as the function was removed
                                displayAttendance = mockAttendance.find(a => {
                                    if (!a.checkInTime) return false;
                                    const checkIn = new Date(a.checkInTime);
                                    return isSameDay(checkIn, date) && (a.nhanVienID === "1" || a.nhanVienID === "2");
                                });
                            }

                            let statusColor = "bg-gray-100";
                            let statusText = "";

                            if (displayAttendance && displayAttendance.checkInTime) {
                                statusColor = "bg-green-100 border-green-200 text-green-700";
                                statusText = "Có mặt";
                            }

                            // Logic đơn giản cho trạng thái "Vắng" của các ngày quá khứ
                            if (!displayAttendance?.checkInTime && date < new Date() && !isToday && date.getDay() !== 0) { // Exclude Sundays?
                                statusColor = "bg-red-50 border-red-100 text-red-600";
                                statusText = "Vắng";
                            }

                            // Các ngày trong tương lai
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
                                        {displayAttendance?.checkInTime && (
                                            <div className="text-[10px] text-gray-500 text-center">
                                                {format(new Date(displayAttendance.checkInTime), "HH:mm")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Details Card */}
                <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col h-full">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">
                        Chi tiết ngày {selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
                    </h2>

                    {/* Render shifts with their own check-in/out buttons */}
                    {(selectedAttendanceDisplay || selectedSchedulesInfo.length > 0) ? (
                        <div className="space-y-6">
                            {/* Schedule Info Section */}
                            {selectedSchedulesInfo.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                        <Clock className="h-4 w-4" />
                                        <span>Danh sách ca làm việc</span>
                                    </div>
                                    {selectedSchedulesInfo.map((shift, idx) => {
                                        const now = new Date();
                                        // Allow CI from 5m before start until end
                                        const canCheckIn = now >= new Date(shift.start.getTime() - 5 * 60 * 1000) && now <= shift.end && !shift.attendance;
                                        const canCheckOut = now >= shift.start && shift.attendance && !shift.attendance.checkOutTime;

                                        return (
                                            <div key={idx} className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex flex-col gap-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="text-xl font-bold text-blue-800">
                                                            {format(shift.start, "HH:mm")} - {format(shift.end, "HH:mm")}
                                                        </div>
                                                        {shift.attendance && (
                                                            <div className="text-xs text-green-600 font-medium mt-1">
                                                                Đã vào: {format(new Date(shift.attendance.checkInTime), "HH:mm")}
                                                                {shift.attendance.checkOutTime && ` • Đã ra: ${format(new Date(shift.attendance.checkOutTime), "HH:mm")}`}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Shift specific buttons (only for Today) */}
                                                {isSameDay(selectedDate!, new Date()) && (
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                                                            disabled={loading || !canCheckIn}
                                                            onClick={() => handleCheckIn(shift.id)}
                                                        >
                                                            {shift.attendance ? "Đã Check In" : "Check In"}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="bg-orange-500 hover:bg-orange-600 text-white text-xs h-8"
                                                            disabled={loading || !canCheckOut}
                                                            onClick={() => handleCheckOut(shift.id)}
                                                        >
                                                            {shift.attendance?.checkOutTime ? "Đã Check Out" : "Check Out"}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500 italic mb-4">Chưa đăng ký lịch làm việc cho ngày này.</div>
                            )}

                            {/* Divider if we had mock attendance too? No, usually it matches. */}
                            {selectedAttendanceDisplay && !selectedSchedulesInfo.some(s => s.attendance?.id === selectedAttendanceDisplay.id) && (
                                <div className="p-4 rounded-lg border bg-gray-50 space-y-3">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dữ liệu chấm công khác</div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Giờ vào:</span>
                                        <span className="font-medium">{format(new Date(selectedAttendanceDisplay.checkInTime), "HH:mm")}</span>
                                    </div>
                                    {selectedAttendanceDisplay.checkOutTime && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Giờ ra:</span>
                                            <span className="font-medium">{format(new Date(selectedAttendanceDisplay.checkOutTime), "HH:mm")}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 flex-1 flex flex-col justify-center">
                            <CalendarPlaceholder className="h-16 w-16 mx-auto mb-3 opacity-20" />
                            <p>Không có dữ liệu lịch làm hoặc chấm công</p>
                            <p className="text-sm">Vui lòng đăng ký lịch hoặc chọn ngày khác.</p>
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
