"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { Taikhoan } from "@/types/schema";

interface EmployeeFormProps {
  initialData?: Partial<Taikhoan>;
  onSubmit: (data: Partial<Taikhoan>) => void;
}

export function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps) {
  const [formData, setFormData] = useState<Partial<Taikhoan>>(initialData || {
    fullName: "",
    username: "",
    email: "",
    phone: "",
    position: "",
    cccd: "",
    password: "", // Only relevant for creation usually
    trangThaiTaiKhoan: "active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile Photo Section (Visual only) */}
      <div className="flex items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
             <Camera className="h-8 w-8" />
        </div>
        <div>
            <h3 className="text-sm font-medium text-gray-900">Profile Photo</h3>
            <p className="text-xs text-gray-500 mb-3">Upload a professional photo for the employee profile.</p>
            <Button type="button" variant="outline" size="sm" className="gap-2">
                <Upload className="h-3 w-3" />
                Upload Photo
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g. John Doe"
            />
        </div>
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="jdoe"
                disabled={!!initialData?.id} // Disable username edit if updating
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="john.doe@company.com"
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="+1 (555) 000-0000"
            />
        </div>
        
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">CCCD (ID Card)</label>
            <input 
                name="cccd"
                value={formData.cccd}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="001099000..."
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Position</label>
            <input 
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g. Software Engineer"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select 
                name="trangThaiTaiKhoan"
                value={formData.trangThaiTaiKhoan}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
        
        {!initialData?.id && (
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Initial Password</label>
                <input 
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!initialData}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="••••••••"
                />
            </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
            {initialData?.id ? "Update Employee" : "Create Employee"}
        </Button>
      </div>
    </form>
  );
}
