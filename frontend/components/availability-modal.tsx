"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate time slots from 06:00 to 22:00
const timeSlots = Array.from({ length: 33 }, (_, i) => {
  const hour = Math.floor(i / 2) + 6;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

// Generate dates starting from Today (next 21 days)
const dates = Array.from({ length: 21 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i); // Commented + 7 shift: date.setDate(date.getDate() + 7 + i);
  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    date: date.getDate().toString(),
    fullDate: date.toISOString().split("T")[0],
  };
});

export function AvailabilityModal({ isOpen, onClose }: AvailabilityModalProps) {
  // Store selected slots (Green)
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  // Store pending slots from API (Purple)
  const [pendingSlots, setPendingSlots] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  // Fetch existing schedules
  useEffect(() => {
    if (isOpen) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        fetchSchedules(user.id);
      }
    }
  }, [isOpen]);

  const fetchSchedules = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/lichlam/my-schedule?userId=${userId}`);
      const data = await res.json();

      if (data.data) {
        const newPending = new Set<string>();
        data.data.forEach((item: any) => {
          // item is CHITIETLICHLAM with included LICHLAM
          if (item.LICHLAM) {
            const start = new Date(item.LICHLAM.gioBatDau);
            const end = new Date(item.LICHLAM.gioKetThuc);
            const dateStr = item.ngayLam.split('T')[0]; // YYYY-MM-DD

            // Find date index
            const dateIndex = dates.findIndex(d => d.fullDate === dateStr);
            if (dateIndex !== -1) {
              // Find time slots covered by start-end
              // Simple logic: iterate all slots, if within range -> add
              timeSlots.forEach((slot, tIndex) => {
                const slotTime = new Date(`${dateStr}T${slot}:00`);
                if (slotTime >= start && slotTime < end) {
                  newPending.add(`${dateIndex}-${tIndex}`);
                }
              });
            }
          }
        });
        setPendingSlots(newPending);
      }
    } catch (e) {
      console.error("Failed to fetch schedules", e);
    }
  };

  const toggleSlot = (dateIndex: number, timeIndex: number) => {
    const key = `${dateIndex}-${timeIndex}`;

    // Disable selecting already pending slots
    if (pendingSlots.has(key)) return;

    const newSlots = new Set(selectedSlots);
    if (newSlots.has(key)) {
      newSlots.delete(key);
    } else {
      newSlots.add(key);
    }
    setSelectedSlots(newSlots);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Bạn chưa đăng nhập!");
        setIsSaving(false);
        return;
      }
      const user = JSON.parse(storedUser);
      const nhanVienID = user.id;

      // Group slots by date
      const slotsByDate: { [key: number]: number[] } = {};
      selectedSlots.forEach((slot) => {
        const [dIndex, tIndex] = slot.split("-").map(Number);
        if (!slotsByDate[dIndex]) slotsByDate[dIndex] = [];
        slotsByDate[dIndex].push(tIndex);
      });

      // Process each date
      for (const [dIndexStr, tIndices] of Object.entries(slotsByDate)) {
        const dIndex = Number(dIndexStr);
        // Sort time indices
        tIndices.sort((a, b) => a - b);

        // Find contiguous ranges
        let start = tIndices[0];
        let prev = tIndices[0];

        const ranges: { start: number; end: number }[] = [];

        for (let i = 1; i < tIndices.length; i++) {
          if (tIndices[i] === prev + 1) {
            prev = tIndices[i];
          } else {
            ranges.push({ start, end: prev });
            start = tIndices[i];
            prev = tIndices[i];
          }
        }
        ranges.push({ start, end: prev });

        // Create API calls for ranges
        for (const range of ranges) {
          const dateObj = dates[dIndex];
          // Format: YYYY-MM-DD
          const dateStr = dateObj.fullDate;

          // Get start time string HH:MM
          const startTimeStr = timeSlots[range.start];
          // Get end time string (end index + 30 mins)
          // timeSlots array logic: 06:00, 06:30...
          // If range.end is index of 06:00, it means 06:00-06:30. 
          // So actual end time is start time of (range.end + 1) index
          let endTimeStr = "";
          if (range.end + 1 < timeSlots.length) {
            endTimeStr = timeSlots[range.end + 1];
          } else {
            // If last slot (22:00), end is 22:30 or handled appropriately
            const [h, m] = timeSlots[range.end].split(':').map(Number);
            const d = new Date();
            d.setHours(h, m + 30);
            endTimeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
          }

          // Construct full Date objects for API
          const gioBatDau = new Date(`${dateStr}T${startTimeStr}:00`);
          const gioKetThuc = new Date(`${dateStr}T${endTimeStr}:00`);

          await fetch('http://localhost:5000/api/lichlam/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nhanVienID,
              ngayLam: dateStr,
              gioBatDau: gioBatDau.toISOString(),
              gioKetThuc: gioKetThuc.toISOString(),
              diaDiem: "Nhà máy chính", // Default
              ghiChu: "Đăng ký qua web"
            })
          });
        }
      }

      alert("Đăng ký thành công!");
      onClose();
      // Optionally reload data here or trigger a callback

    } catch (error) {
      console.error("Lỗi khi lưu lịch:", error);
      alert("Có lỗi xảy ra khi lưu lịch.");
    } finally {
      setIsSaving(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Container with max size and scroll */}
      <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header - Blue */}
        <div className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <X className="h-6 w-6 cursor-pointer hover:opacity-80" onClick={onClose} />
            Đăng ký lịch làm việc - Tháng {(new Date(dates[0].fullDate)).getMonth() + 1}/{(new Date(dates[0].fullDate)).getFullYear()}
          </h2>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50"
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>

        {/* Scrollable Grid Area */}
        <div className="flex-1 overflow-auto bg-white relative">
          <div className="min-w-max">
            {/* Header Row: Dates */}
            <div className="sticky top-0 z-20 flex bg-white border-b shadow-sm">
              <div className="sticky left-0 z-30 w-20 bg-white border-r shrink-0"></div> {/* Corner */}
              {dates.map((d, i) => (
                <div key={i} className="flex w-16 flex-col items-center justify-center py-3 border-r">
                  <span className="text-xs text-gray-400 uppercase font-medium">{d.day}</span>
                  <span className="text-lg font-bold text-gray-800">{d.date}</span>
                </div>
              ))}
            </div>

            {/* Grid Body */}
            <div className="relative">
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="flex border-b hover:bg-gray-50/50">
                  {/* Time Column (Sticky) */}
                  <div className="sticky left-0 z-10 w-20 flex items-center justify-center text-xs font-semibold text-gray-500 bg-white border-r shrink-0">
                    {time}
                  </div>

                  {/* Slots */}
                  {dates.map((_, dateIndex) => {
                    const key = `${dateIndex}-${timeIndex}`;
                    const isSelected = selectedSlots.has(key);
                    const isPending = pendingSlots.has(key);

                    return (
                      <div
                        key={dateIndex}
                        onClick={() => toggleSlot(dateIndex, timeIndex)}
                        className={cn(
                          "h-10 w-16 border-r cursor-pointer transition-colors relative",
                          isPending ? "bg-purple-100/50 cursor-not-allowed" :
                            isSelected ? "bg-emerald-100/50" : "hover:bg-blue-50"
                        )}
                      >
                        {/* Show checkmark if selected? Or just color? Image implies mostly empty but highlighting */}
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          </div>
                        )}
                        {isPending && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer / Legend */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-center gap-8 border-t text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
            <span>Chờ duyệt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span>Đã duyệt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span>Đã chọn (Sẽ đăng ký)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
