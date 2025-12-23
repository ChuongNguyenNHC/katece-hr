"use client";

import { EmployeeForm } from "@/components/employee-form";
import { useRouter } from "next/navigation";

export default function NewEmployeePage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("Creating employee:", data);
    // Mock API call
    setTimeout(() => {
      router.push("/hr/employees");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Employee</h1>
        <p className="text-gray-500">Enter the details of the new employee.</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <EmployeeForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
