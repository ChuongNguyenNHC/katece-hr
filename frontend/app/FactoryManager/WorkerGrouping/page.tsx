"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getWorkers, getProductionTeams, assignWorkerToTeam } from "@/lib/api";

export default function FactoryManagerWorkerGroupingPage() {
    const [workers, setWorkers] = useState<any[]>([]);
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [workersData, teamsData] = await Promise.all([
                getWorkers(),
                getProductionTeams()
            ]);
            setWorkers(workersData);
            setTeams(teamsData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAssignTeam = async (userId: string, teamId: string) => {
        try {
            await assignWorkerToTeam(userId, teamId);
            // Update local state to reflect change immediately or refetch
            setWorkers(prev => prev.map(w => 
                w.id === userId ? { ...w, toSanXuatID: teamId, TOSANXUAT: teams.find(t => t.id === teamId) } : w
            ));
        } catch (error) {
            console.error("Failed to assign team", error);
            alert("Lỗi khi phân tổ");
        }
    };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Phân nhóm công nhân</h1>
          <p className="text-gray-500">Quản lý phân tổ, nhóm công nhân.</p>
        </div>
        <Link href="/FactoryManager/WorkerGrouping/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Thêm nhóm
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Tìm kiếm công nhân..." 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
        </div>
        <div className="flex items-center gap-2">
            <select className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tất cả trạng thái</option>
                <option>Hoạt động</option>
                <option>Đã nghỉ việc</option>
            </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {loading ? (
             <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : (
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                <tr>
                    <th className="px-6 py-4">Họ tên</th>
                    <th className="px-6 py-4">Vị trí</th>
                    <th className="px-6 py-4">Tổ / Nhóm</th>
                     {/* Temporarily hidden Manager column as it's not in user model explicitly yet or needs join */}
                    {/* <th className="px-6 py-4">Người quản lý</th> */}
                    <th className="px-6 py-4">Trạng thái</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {workers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {worker.fullName?.split(" ").map((n: any) => n[0]).join("") || "CN"}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{worker.fullName}</div>
                                    <div className="text-gray-500 text-xs">{worker.username || worker.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{worker.position}</td>
                        <td className="px-6 py-4">
                            <select 
                                className="border rounded px-2 py-1 text-xs bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={worker.toSanXuatID || ""}
                                onChange={(e) => handleAssignTeam(worker.id, e.target.value)}
                            >
                                <option value="">Chưa phân tổ</option>
                                {teams.map(team => (
                                    <option key={team.id} value={team.id}>{team.tenToSanXuat}</option>
                                ))}
                            </select>
                        </td>
                        {/* <td className="px-6 py-4">
                             {worker.NguoiQuanLy ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px]">
                                        {worker.NguoiQuanLy.fullName.charAt(0)}
                                    </div>
                                    <span className="text-gray-600 text-sm">{worker.NguoiQuanLy.fullName}</span>
                                </div>
                            ) : (
                                <span className="text-gray-400 italic text-xs">--</span>
                            )}
                        </td> */}
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-100`}>
                                Hoạt động
                            </span>
                        </td>
                    </tr>
                ))}
                 {workers.length === 0 && (
                    <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">
                            Chưa có công nhân nào.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        )}
      </div>
    </div>
  );
}
