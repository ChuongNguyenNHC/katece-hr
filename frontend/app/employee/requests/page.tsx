"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="text-gray-500">Manage your leave and overtime requests.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>

      <div className="grid gap-4">
        {/* Request Card 1 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">Sick Leave</h3>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>
                </div>
                <p className="text-sm text-gray-500">Requested for Oct 20 - Oct 21</p>
            </div>
            <div className="text-right text-sm text-gray-500">
                Submitted on Oct 18
            </div>
        </div>

         {/* Request Card 2 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">Overtime Approval</h3>
                     <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Approved</Badge>
                </div>
                <p className="text-sm text-gray-500">4 Hours on Oct 14</p>
            </div>
             <div className="text-right text-sm text-gray-500">
                Submitted on Oct 15
            </div>
        </div>

         {/* Request Card 3 */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm opacity-60">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">Remote Work</h3>
                    <Badge variant="destructive" className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200">Rejected</Badge>
                </div>
                <p className="text-sm text-gray-500">Request for full remote week</p>
            </div>
             <div className="text-right text-sm text-gray-500">
                Submitted on Oct 01
            </div>
        </div>
      </div>
    </div>
  );
}
