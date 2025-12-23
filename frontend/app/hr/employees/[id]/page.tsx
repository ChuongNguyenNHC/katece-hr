"use client";

import { EmployeeForm } from "@/components/employee-form";
import { useRouter, useParams } from "next/navigation";

import { mockEmployees } from "@/lib/mock-data";

// Mock data fetcher
const getEmployee = (id: string) => {
  const emp = mockEmployees.find(e => e.id === id);
  if (!emp) return undefined;
  // Return Partial<Taikhoan> to match form props
  return emp;
};

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeData = getEmployee(params.id as string);

  const handleSubmit = (data: any) => {
    console.log("Updating employee:", data);
    // Mock API call
    setTimeout(() => {
      router.push("/hr/employees");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Employee</h1>
        <p className="text-gray-500">Update employee information.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <EmployeeForm initialData={employeeData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
