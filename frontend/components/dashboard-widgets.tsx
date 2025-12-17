import { MessageSquare, ThumbsUp } from "lucide-react";

export function DashboardWidgets() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <MessageSquare className="h-8 w-8 fill-current" />
        </div>
        <div>
          <div className="text-3xl font-bold text-amber-600">3</div>
          <div className="text-sm font-medium text-gray-600">
            Pending Tasks
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <ThumbsUp className="h-8 w-8 fill-current" />
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600">120</div>
          <div className="text-sm font-medium text-gray-600">
            Hours Worked
          </div>
        </div>
      </div>
    </div>
  );
}
