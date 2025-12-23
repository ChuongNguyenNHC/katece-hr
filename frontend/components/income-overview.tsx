import { TrendingDown } from "lucide-react";

export function IncomeOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Chart Section */}
      <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 font-semibold text-gray-800">
          Thu nhập 14 ngày qua
        </h3>
        <div className="relative h-40 w-full">
            {/* Simple Mock Chart */}
            <svg
                viewBox="0 0 100 40"
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
            >
                {/* Horizontal Axis */}
                <line x1="0" y1="35" x2="100" y2="35" stroke="#10b981" strokeWidth="0.5" />
                
                {/* Mock Data Points */}
                 <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="0.5"
                    points="0,35 10,35 20,35 30,35 40,35 50,35 60,35 70,35 80,35 90,35 100,35"
                 />
            </svg>
            
            {/* Axis Labels */}
            <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>3</span> <span>4</span> <span>5</span> <span>6</span>
                <span>7</span> <span>8</span> <span>9</span> <span>10</span>
                <span>11</span> <span>12</span> <span>13</span> <span>14</span>
                <span>15</span> <span>16</span>
            </div>
        </div>
      </div>

      {/* Estimated Income Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800">
          Thu nhập ước tính tháng này
        </h3>
        <div className="mt-8">
            <div className="text-4xl font-bold text-rose-500">
                0<span className="text-2xl align-top">₫</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-rose-500">
                <TrendingDown className="h-4 w-4" />
                <span className="font-medium">100% (264000₫)</span>
                <span className="text-gray-400">so với tháng trước</span>
            </div>
        </div>
      </div>
    </div>
  );
}
