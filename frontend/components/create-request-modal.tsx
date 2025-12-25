"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

interface CreateRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateRequestModal({
    isOpen,
    onClose,
}: CreateRequestModalProps) {
    const [requestType, setRequestType] = useState("sick_leave");
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!reason.trim()) return;

        setIsSubmitting(true);
        // Mock API call
        setTimeout(() => {
            alert(`Đã gửi yêu cầu: ${requestType === 'sick_leave' ? 'Nghỉ ốm' : 'Tăng ca'}\nNgày: ${date}\nLý do: ${reason}`);
            setIsSubmitting(false);
            setReason("");
            setDate("");
            onClose();
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Tạo yêu cầu mới</DialogTitle>
                    <DialogDescription>
                        Điền thông tin chi tiết cho yêu cầu của bạn.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="request-type">Loại yêu cầu</Label>
                        <select
                            id="request-type"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                        >
                            <option value="sick_leave">Nghỉ ốm</option>
                            <option value="overtime">Duyệt tăng ca</option>
                            <option value="remote">Làm việc từ xa</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Thời gian</Label>
                        <Input
                            id="date"
                            type="text"
                            placeholder="VD: 20/10 - 21/10"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reason">Lý do / Nội dung</Label>
                        <Textarea
                            id="reason"
                            placeholder="Mô tả chi tiết yêu cầu của bạn..."
                            className="min-h-[100px]"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                        Hủy
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !reason.trim()}
                    >
                        <Send className="h-4 w-4" />
                        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
