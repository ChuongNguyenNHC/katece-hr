"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShiftCard } from "@/components/shift-card";
import { CheckInModal } from "@/components/check-in-modal";

export function ScheduleView() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [checkInState, setCheckInState] = useState<{
    isOpen: boolean;
    type: "check-in" | "check-out";
  }>({ isOpen: false, type: "check-in" });

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Approx card width + gap
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const openCheckIn = () => setCheckInState({ isOpen: true, type: "check-in" });
  const openCheckOut = () => setCheckInState({ isOpen: true, type: "check-out" });


  return (
    <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Ca làm sắp tới</h2>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => scroll("left")}
            className="h-8 w-8 rounded-full bg-blue-500/50 text-white hover:bg-blue-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => scroll("right")}
            className="h-8 w-8 rounded-full bg-blue-500/50 text-white hover:bg-blue-400"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Horizontal Scroll / Carousel Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
      >
        
        <div className="snap-start">
            <ShiftCard 
                dateTag="Hôm nay"
                dateTagColor="emerald"
                title="Ca Sáng"
                role="Công nhân may"
                dateNumber="17"
                time="08:00 - 16:00"
                location="KCN Mỹ Phước 3, Bình Dương"
                status="active"
                onCheckIn={openCheckIn}
                onCheckOut={openCheckOut}
            />
        </div>

        <div className="snap-start">
            <ShiftCard 
                dateTag="Ngày mai"
                dateTagColor="blue"
                title="Ca Chiều"
                role="Kiểm hàng"
                dateNumber="18"
                time="13:00 - 21:00"
                location="KCN Mỹ Phước 3, Bình Dương"
                status="upcoming"
            />
        </div>

        <div className="snap-start">
            <ShiftCard 
                dateTag="Ngày mai"
                dateTagColor="blue"
                title="Ca Chiều"
                role="Kiểm hàng"
                dateNumber="18"
                time="13:00 - 21:00"
                location="KCN Mỹ Phước 3, Bình Dương"
                status="upcoming"
            />
        </div>
        
         {/* Placeholder for "More" */}
         <div className="w-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center snap-start">
            <ChevronRight className="text-white/50" />
         </div>
      </div>

      <CheckInModal 
        isOpen={checkInState.isOpen} 
        onClose={() => setCheckInState({ ...checkInState, isOpen: false })} 
        type={checkInState.type}
      />
    </div>
  );
}
