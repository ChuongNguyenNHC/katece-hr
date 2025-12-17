"use client";

import { useState } from "react";
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

// Generate next 14 days
const dates = Array.from({ length: 21 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    date: date.getDate().toString(),
    fullDate: date.toISOString().split("T")[0],
  };
});

export function AvailabilityModal({ isOpen, onClose }: AvailabilityModalProps) {
  // Store selected slots as "dateIndex-timeIndex" strings
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

  const toggleSlot = (dateIndex: number, timeIndex: number) => {
    const key = `${dateIndex}-${timeIndex}`;
    const newSlots = new Set(selectedSlots);
    if (newSlots.has(key)) {
      newSlots.delete(key);
    } else {
      newSlots.add(key);
    }
    setSelectedSlots(newSlots);
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
             Set up schedule
          </h2>
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
                                const isSelected = selectedSlots.has(`${dateIndex}-${timeIndex}`);
                                return (
                                    <div
                                        key={dateIndex}
                                        onClick={() => toggleSlot(dateIndex, timeIndex)}
                                        className={cn(
                                            "h-10 w-16 border-r cursor-pointer transition-colors relative",
                                            isSelected ? "bg-emerald-100/50" : "hover:bg-blue-50"
                                        )}
                                    >
                                        {/* Show checkmark if selected? Or just color? Image implies mostly empty but highlighting */}
                                        {isSelected && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
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
                 <span>Waiting</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                 <span>Accepted</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                 <span>Selected</span>
             </div>
        </div>
      </div>
    </div>
  );
}
