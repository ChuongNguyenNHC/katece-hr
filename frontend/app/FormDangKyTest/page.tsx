"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, UserPlus, CheckCircle2 } from "lucide-react";

export default function FormDangKyTest() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: "",
        position: "Cong nhan",
        phone: "",
        cccd: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const response = await axios.post("http://localhost:5000/api/taikhoan/register", formData);
            setMessage({ type: "success", text: "Đăng ký thành công! ID: " + response.data.id });
            // Optional: reset form
            // setFormData({ username: "", email: "", password: "", fullName: "", position: "Công nhân may", phone: "", cccd: "" });
        } catch (error: any) {
            console.error("Lỗi đăng ký:", error);
            setMessage({
                type: "error",
                text: error.response?.data?.error || "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-xl border-t-4 border-t-blue-600">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <UserPlus className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Đăng ký tài khoản</CardTitle>
                    </div>
                    <CardDescription>
                        Nhập thông tin cá nhân để tạo tài khoản mới trong hệ thống.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {message && (
                            <Alert className={`${message.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                                <div className="flex items-center gap-2">
                                    {message.type === "success" && <CheckCircle2 className="h-4 w-4" />}
                                    <AlertDescription className="font-medium">
                                        {message.text}
                                    </AlertDescription>
                                </div>
                            </Alert>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Họ và tên</Label>
                                <Input id="fullName" name="fullName" placeholder="Nguyễn Văn A" required value={formData.fullName} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <Input id="phone" name="phone" placeholder="0901234567" required value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="email@example.com" required value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cccd">Số CCCD</Label>
                                <Input id="cccd" name="cccd" placeholder="012345678912" required value={formData.cccd} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position">Chức vụ</Label>
                            <select
                                id="position"
                                name="position"
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                value={formData.position}
                                onChange={handleChange}
                            >
                                <option value="Cong nhan">Cong nhan</option>
                                <option value="To truong">To truong</option>
                                <option value="Quan ly xuong">Quan ly xuong</option>
                                <option value="Ke toan">Ke toan</option>
                                <option value="Quan ly nhan su">Quan ly nhan su</option>
                                <option value="Kho">Kho</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Tên đăng nhập</Label>
                            <Input id="username" name="username" placeholder="nguyenvana123" required value={formData.username} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-lg font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                "Đăng ký ngay"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
