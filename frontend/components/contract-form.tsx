"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ContractFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export function ContractForm({ initialData, onSubmit }: ContractFormProps) {
  const [formData, setFormData] = useState(initialData || {
    employeeId: "",
    type: "Full-time",
    startDate: "",
    endDate: "",
    salary: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Employee</label>
            <select 
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
                <option value="">Select Employee</option>
                <option value="1">Alex Johnson</option>
                <option value="2">Sarah Williams</option>
                <option value="3">Michael Brown</option>
            </select>
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Contract Type</label>
             <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract / Freelance</option>
                <option value="Internship">Internship</option>
            </select>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Date</label>
             <input 
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">End Date</label>
             <input 
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Salary / Rate</label>
             <input 
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                placeholder="e.g. $80,000 / year"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
        </div>
      </div>

       <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Notes / Conditions</label>
            <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                placeholder="Additional contract details..."
            />
        </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
             Create Contract
        </Button>
      </div>
    </form>
  );
}
