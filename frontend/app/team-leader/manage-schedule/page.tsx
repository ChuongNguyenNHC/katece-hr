"use client";

import { useState } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Save, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEmployees } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Generate time slots 06:00 - 22:00
const timeSlots = Array.from({ length: 33 }, (_, i) => {
  const hour = Math.floor(i / 2) + 6;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

import { AddWorkerModal } from "@/components/team-leader/add-worker-modal";

export default function TeamLeaderManageSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
  
  // Filter for Team Leader's team "t1"
  const teamEmployees = mockEmployees.filter(e => e.toSanXuatID === "t1");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(teamEmployees[0]?.id || "");
  
  // Mock Data: Store slots as Set<"dateIndex-timeIndex">
  // For demo, we just use a simple object state
  type ScheduleState = Record<string, Set<string>>; // employeeId -> Set of "yyyy-MM-dd-HH:mm"
  
  // Mock Worker Preferences (Purple)
  const [workerPreferences] = useState<ScheduleState>(() => {
    const prefs: ScheduleState = {};
    teamEmployees.forEach(e => {
        // Mock some preferences for this week
        const s = new Set<string>();
        // Add some random slots
        const start = startOfWeek(new Date(), { weekStartsOn: 1 });
         for(let d=0; d<5; d++) {
             const day = addDays(start, d);
             const dateStr = format(day, "yyyy-MM-dd");
             s.add(`${dateStr}-08:00`);
             s.add(`${dateStr}-08:30`);
             s.add(`${dateStr}-09:00`);
             s.add(`${dateStr}-09:30`);
         }
        prefs[e.id] = s;
    });
    return prefs;
  });

  // Mock Leader Assignments (Blue)
  const [assignedSchedule, setAssignedSchedule] = useState<ScheduleState>({});

  // Date Navigation (Week view)
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  const toggleSlot = (day: Date, time: string) => {
     if (!selectedEmployeeId) return;

     const dateKey = format(day, "yyyy-MM-dd");
     const slotKey = `${dateKey}-${time}`;
     
     setAssignedSchedule(prev => {
         const empSlots = new Set(prev[selectedEmployeeId] || []);
         if (empSlots.has(slotKey)) {
             empSlots.delete(slotKey);
         } else {
             empSlots.add(slotKey);
         }
         return { ...prev, [selectedEmployeeId]: empSlots };
     });
  };

  const isWorkerPreferred = (day: Date, time: string) => {
      if (!selectedEmployeeId) return false;
      const dateKey = format(day, "yyyy-MM-dd");
      return workerPreferences[selectedEmployeeId]?.has(`${dateKey}-${time}`);
  };

  const isLeaderAssigned = (day: Date, time: string) => {
      if (!selectedEmployeeId) return false;
      const dateKey = format(day, "yyyy-MM-dd");
      return assignedSchedule[selectedEmployeeId]?.has(`${dateKey}-${time}`);
  };

  const handleSave = () => {
    alert("Đã lưu lịch làm việc cho tổ!");
  };

  const handleWorkerAdded = () => {
      // In a real app, you would reload the employee list here
      // For now, we rely on the modal's success alert
      console.log("Worker added, refreshing list...");
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between shrink-0">
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Xếp lịch làm việc</h1>
            <p className="text-gray-500">Xem nguyện vọng và xếp lịch cho từng nhân viên.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={() => setIsAddWorkerOpen(true)} variant="outline" className="gap-2">
                Thêm nhân sự
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Save className="h-4 w-4" />
                Lưu thay đổi
            </Button>
        </div>
      </div>

      <AddWorkerModal 
        isOpen={isAddWorkerOpen}
        onClose={() => setIsAddWorkerOpen(false)}
        onSuccess={handleWorkerAdded}
      />

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left: Employee List */}
        <div className="w-64 flex flex-col bg-white rounded-lg border shadow-sm shrink-0">
             <div className="p-4 border-b">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm nhân viên..." 
                        className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {teamEmployees.map(emp => (
                    <button
                        key={emp.id}
                        onClick={() => setSelectedEmployeeId(emp.id)}
                        className={cn(
                            "w-full text-left px-3 py-3 rounded-md text-sm transition-colors flex flex-col gap-1",
                            selectedEmployeeId === emp.id 
                                ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200" 
                                : "text-gray-700 hover:bg-gray-50"
                        )}
                    >
                        <div className="font-semibold">{emp.fullName}</div>
                        <div className="text-xs text-gray-500">{emp.position}</div>
                        {workerPreferences[emp.id]?.size > 0 && (
                            <div className="text-[10px] text-purple-600 font-medium flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Đã đăng ký lịch
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Right: Schedule Grid */}
        <div className="flex-1 bg-white rounded-lg border shadow-sm flex flex-col overflow-hidden">
             {/* Toolbar */}
            <div className="p-4 border-b flex items-center justify-between bg-gray-50/50 shrink-0">
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={prevWeek}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-semibold text-gray-900 w-48 text-center bg-white border px-3 py-1.5 rounded-md shadow-sm">
                        {format(startDate, "dd/MM")} - {format(addDays(startDate, 6), "dd/MM/yyyy")}
                    </div>
                    <Button variant="ghost" size="icon" onClick={nextWeek}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                 <div className="flex gap-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-purple-100 border border-purple-200"></div>
                        <span>Đăng ký</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-500 border border-blue-600"></div>
                        <span>Chốt lịch</span>
                    </div>
                 </div>
            </div>
            
            {/* Grid Area */}
            <div className="flex-1 overflow-auto relative">
                 <div className="min-w-max">
                     {/* Header Row */}
                     <div className="sticky top-0 z-20 flex bg-white border-b shadow-sm">
                        <div className="sticky left-0 z-30 w-20 bg-white border-r shrink-0"></div>
                        {weekDays.map((day, i) => (
                             <div key={i} className={`flex-1 min-w-[100px] flex flex-col items-center justify-center py-3 border-r last:border-0 ${isSameDay(day, new Date()) ? 'bg-blue-50/30' : ''}`}>
                                <span className="text-xs text-gray-400 uppercase font-medium">{format(day, "EEEE", { locale: vi })}</span>
                                <span className="text-lg font-bold text-gray-800">{format(day, "dd")}</span>
                            </div>
                        ))}
                     </div>

                     {/* Body */}
                     <div className="relative">
                        {timeSlots.map((time, timeIndex) => (
                            <div key={time} className="flex border-b last:border-0 hover:bg-gray-50/30">
                                <div className="sticky left-0 z-10 w-20 flex items-center justify-center text-xs font-medium text-gray-500 bg-white border-r shrink-0">
                                    {time}
                                </div>
                                {weekDays.map((day, dayIndex) => {
                                    const preferred = isWorkerPreferred(day, time);
                                    const assigned = isLeaderAssigned(day, time);
                                    
                                    return (
                                        <div
                                            key={dayIndex}
                                            onClick={() => toggleSlot(day, time)}
                                            className={cn(
                                                "flex-1 min-w-[100px] h-10 border-r last:border-0 cursor-pointer transition-all relative",
                                                assigned 
                                                    ? "bg-blue-500 border-blue-600" // Assigned (Blue Solid)
                                                    : preferred 
                                                        ? "bg-purple-100 hover:bg-purple-200" // Preferred (Purple Light)
                                                        : "hover:bg-blue-50" // Empty
                                            )}
                                        >
                                            {/* Visual helper for selection */}
                                            {assigned && <div className="w-full h-full"></div>}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
