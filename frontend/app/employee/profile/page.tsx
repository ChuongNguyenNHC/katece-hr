"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming Input exists from exploration

export default function ProfilePage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Manage your personal information and account settings.</p>
      </div>

      <div className="space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
             <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                 <span className="text-gray-400 text-xs text-center px-2">Upload Photo</span>
             </div>
             <div>
                 <h3 className="text-lg font-medium">Alex Johnson</h3>
                 <p className="text-sm text-gray-500">Support Team Lead</p>
                 <Button variant="outline" size="sm" className="mt-2">Change Avatar</Button>
             </div>
        </div>

        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First Name</label>
                    <Input defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Last Name</label>
                    <Input defaultValue="Johnson" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label>
                <Input defaultValue="alex.johnson@company.com" type="email" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone Number</label>
                <Input defaultValue="+84 901 234 567" type="tel" />
            </div>
             
             <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Home Address</label>
                <Input defaultValue="123 Main St, District 1, HCMC" />
            </div>
        </div>

        <div className="pt-4 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
