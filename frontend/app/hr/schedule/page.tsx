"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Save, Wand2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mockEmployees } from "@/lib/mock-data";

// Generate time slots 06:00 - 22:00
const timeSlots = Array.from({ length: 33 }, (_, i) => {
  const hour = Math.floor(i / 2) + 6;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minute}`;
});

// Generate next 7 days
const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    date: date.getDate().toString(),
    fullDate: date.toISOString().split("T")[0],
  };
});

export default function SchedulePage() {
  const [selectedEmployee, setSelectedEmployee] = useState(mockEmployees[0].id);
  const [scheduleData, setScheduleData] = useState<Record<string, Set<string>>>({});

  // Helper to toggle slot
  const toggleSlot = (dayIndex: number, timeIndex: number) => {
    // employeeId is already a string
    const employeeId = selectedEmployee;
    const key = `${dayIndex}-${timeIndex}`;
    
    setScheduleData(prev => {
      const employeeSlots = new Set(prev[employeeId] || []);
      if (employeeSlots.has(key)) {
        employeeSlots.delete(key);
      } else {
        employeeSlots.add(key);
      }
      return { ...prev, [employeeId]: employeeSlots };
    });
  };

  const getSlotStatus = (dayIndex: number, timeIndex: number) => {
     const employeeId = selectedEmployee;
     const key = `${dayIndex}-${timeIndex}`;
     const employeeSlots = scheduleData[employeeId];
     return employeeSlots?.has(key);
  };

  const selectedEmployeeData = mockEmployees.find(e => e.id === selectedEmployee);

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Quản lý lịch làm việc</h1>
          <p className="text-gray-500">Quản lý ca làm việc và nhân sự sẵn sàng.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
                <Wand2 className="h-4 w-4" />
                Tự động điền
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Save className="h-4 w-4" />
                Lưu thay đổi
            </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Sidebar: Employee List */}
        <div className="w-64 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 border-b">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {mockEmployees.map(emp => (
                    <button
                        key={emp.id}
                        onClick={() => setSelectedEmployee(emp.id)}
                        className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            selectedEmployee === emp.id 
                                ? "bg-blue-50 text-blue-700 font-medium" 
                                : "text-gray-700 hover:bg-gray-50"
                        )}
                    >
                        <div className="font-medium">{emp.fullName}</div>
                        <div className="text-xs text-gray-500">{emp.position}</div>
                    </button>
                ))}
            </div>
        </div>

        {/* Main Content: Schedule Grid */}
        <div className="flex-1 bg-white rounded-lg border shadow-sm flex flex-col overflow-hidden">
            {/* Calendar Header Control */}
            <div className="p-4 border-b flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center gap-4">
                    <h2 className="font-semibold text-gray-900">
                        Lịch của {selectedEmployeeData?.fullName}
                    </h2>
                    <div className="flex items-center gap-1 bg-white border rounded-md p-0.5">
                        <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="h-4 w-4 text-gray-500" /></button>
                         <span className="text-xs font-medium px-2 text-gray-600">Tuần này</span>
                        <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="h-4 w-4 text-gray-500" /></button>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-200"></div>
                        <span>Ca làm việc</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-blue-50 border border-blue-100"></div>
                        <span>Trống</span>
                    </div>
                 </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto relative">
                <div className="min-w-max">
                     {/* Dates Header */}
                    <div className="sticky top-0 z-20 flex bg-white border-b shadow-sm">
                        <div className="sticky left-0 z-30 w-16 bg-white border-r shrink-0"></div>
                        {dates.map((d, i) => (
                            <div key={i} className="flex-1 min-w-[100px] flex flex-col items-center justify-center py-3 border-r last:border-0">
                                <span className="text-xs text-gray-400 uppercase font-medium">{d.day}</span>
                                <span className="text-lg font-bold text-gray-800">{d.date}</span>
                            </div>
                        ))}
                    </div>

                    {/* Time Slots */}
                    <div className="relative">
                        {timeSlots.map((time, timeIndex) => (
                            <div key={time} className="flex border-b last:border-0 hover:bg-gray-50/30">
                                <div className="sticky left-0 z-10 w-16 flex items-center justify-center text-xs font-medium text-gray-500 bg-white border-r shrink-0">
                                    {time}
                                </div>
                                {dates.map((_, dayIndex) => {
                                    const isActive = getSlotStatus(dayIndex, timeIndex);
                                    return (
                                        <div
                                            key={dayIndex}
                                            onClick={() => toggleSlot(dayIndex, timeIndex)}
                                            className={cn(
                                                "flex-1 min-w-[100px] h-10 border-r last:border-0 cursor-pointer transition-all relative group",
                                                isActive ? "bg-emerald-100/70" : "hover:bg-blue-50/50"
                                            )}
                                        >
                                            {/* Add Button on Hover */}
                                             {!isActive && (
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <Plus className="h-3 w-3 text-blue-400" />
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
        </div>
      </div>
       <div className="hidden">
           {/* Force include used icons if needed */}
       </div>
    </div>
  );
}

