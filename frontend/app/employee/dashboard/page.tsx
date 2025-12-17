"use client";

import { useState } from "react";
import { ScheduleView } from "@/components/schedule-view";
import { IncomeOverview } from "@/components/income-overview";
import { DashboardWidgets } from "@/components/dashboard-widgets";
import { AvailabilityModal } from "@/components/availability-modal";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function EmployeeDashboardPage() {
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex items-center justify-end">
        <Button 
            onClick={() => setIsAvailabilityOpen(true)}
            variant="outline"
            className="gap-2"
        >
            <Settings className="h-4 w-4" />
            Setup Availability
        </Button>
      </div>

      <ScheduleView />
      
      <IncomeOverview />
      
      <DashboardWidgets />

      <AvailabilityModal 
        isOpen={isAvailabilityOpen} 
        onClose={() => setIsAvailabilityOpen(false)} 
      />
    </div>
  );
}
