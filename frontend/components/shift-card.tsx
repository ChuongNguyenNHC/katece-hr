"use client";

import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShiftCardProps {
  dateTag: string;
  dateTagColor?: "emerald" | "blue";
  title: string;
  role: string;
  dateNumber: string;
  time: string;
  location: string;
  status: "active" | "upcoming";
  onCheckIn?: () => void;
  onCheckOut?: () => void;
}

export function ShiftCard({
  dateTag,
  dateTagColor = "blue",
  title,
  role,
  dateNumber,
  time,
  location,
  status,
  onCheckIn,
  onCheckOut,
}: ShiftCardProps) {
  return (
    <div
      className={cn(
        "min-w-[320px] flex-1 rounded-2xl bg-white p-6 shadow-sm md:min-w-[400px]",
        dateTag !== "Today" && "bg-white/95 opacity-90"
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <span
            className={cn(
              "rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider",
              dateTag === "Today"
                ? "bg-emerald-100 text-emerald-600"
                : "bg-blue-100 text-blue-600"
            )}
          >
            {dateTag}
          </span>
          <h3 className="mt-2 text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm font-medium text-gray-500">{role}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full font-bold",
            dateTag === "Today"
              ? "bg-blue-50 text-blue-600"
              : "bg-gray-50 text-gray-400"
          )}
        >
          {dateNumber}
        </div>
      </div>

      <div className={cn("mb-6 space-y-3", dateTag !== "Today"  && "opacity-60")}>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{location}</span>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-100 pt-4 flex gap-3">
        {dateTag === "Today" ? (
          <>
            <Button 
                onClick={onCheckIn}
                className="flex-1 bg-emerald-500 font-semibold text-white hover:bg-emerald-600"
            >
              Check In
            </Button>
            <Button
              onClick={onCheckOut}
              variant="outline"
              className="flex-1 border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
            >
              Check Out
            </Button>
          </>
        ) : (
          <Button
            disabled
            className="w-full cursor-not-allowed bg-gray-100 text-gray-400 hover:bg-gray-100"
          >
            Not started yet
          </Button>
        )}
      </div>
    </div>
  );
}
