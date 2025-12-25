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
import { Send } from "lucide-react";

interface SalaryFeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    salaryId: string | null;
    monthYear: string;
}

export function SalaryFeedbackModal({
    isOpen,
    onClose,
    salaryId,
    monthYear,
}: SalaryFeedbackModalProps) {
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!feedback.trim()) return;

        setIsSubmitting(true);
        // Mock API call
        setTimeout(() => {
            alert(`Đã gửi phản hồi cho ${monthYear}: ${feedback}`);
            setIsSubmitting(false);
            setFeedback("");
            onClose();
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{monthYear ? `Báo cáo sai sót - ${monthYear}` : "Tạo yêu cầu mới"}</DialogTitle>
                    <DialogDescription>
                        {monthYear
                            ? "Vui lòng mô tả chi tiết sai sót hoặc thắc mắc của bạn về bảng lương này."
                            : "Vui lòng mô tả chi tiết yêu cầu hoặc thắc mắc của bạn."}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Textarea
                        placeholder="Mô tả sai sót trong bảng lương..."
                        className="min-h-[120px]"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                        Hủy
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !feedback.trim()}
                    >
                        <Send className="h-4 w-4" />
                        {isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
