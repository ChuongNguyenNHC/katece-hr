import * as repository from './chamcong.repository';

export class ChamCongService {
    async checkIn(userId: string, chiTietLichLamID: string) {
        // 1. Get shift details
        const shift = await repository.getShiftWithSchedule(chiTietLichLamID);
        if (!shift || !shift.LICHLAM) {
            throw new Error('Không tìm thấy lịch làm việc!');
        }

        if (shift.nhanVienID !== userId) {
            throw new Error('Lịch làm việc này không thuộc về bạn!');
        }

        // 2. Check if already checked in
        const existingAttendance = await repository.findAttendanceByShift(chiTietLichLamID);
        if (existingAttendance) {
            throw new Error('Bạn đã check-in cho ca này rồi!');
        }

        // 3. Time validation: allow check-in from 5m before start until end
        const now = new Date();
        const startRaw = shift.LICHLAM.gioBatDau;
        const endRaw = shift.LICHLAM.gioKetThuc;

        if (!startRaw || !endRaw) {
            throw new Error('Lịch làm việc không có thông tin giờ bắt đầu/kết thúc!');
        }

        const start = new Date(startRaw as Date);
        const end = new Date(endRaw as Date);
        // Allow 5 minutes early
        const allowStart = new Date(start.getTime() - 5 * 60 * 1000);

        if (now < allowStart) {
            throw new Error(`Chưa đến giờ check-in! Bạn có thể check-in từ ${allowStart.toLocaleTimeString('vi-VN')}.`);
        }
        if (now > end) {
            throw new Error('Đã quá giờ làm việc của ca này!');
        }

        // 4. Create new check-in record
        return repository.createCheckIn(userId, chiTietLichLamID);
    }

    async checkOut(userId: string, chiTietLichLamID: string) {
        // 1. Find attendance record for this shift
        const attendance = await repository.findAttendanceByShift(chiTietLichLamID);
        if (!attendance) {
            throw new Error('Bạn chưa check-in cho ca này!');
        }

        if (attendance.checkOutTime) {
            throw new Error('Bạn đã check-out cho ca này rồi!');
        }

        // 2. Time validation: allow check-out from start until 30m after end
        const shift = await repository.getShiftWithSchedule(chiTietLichLamID);
        const now = new Date();
        if (shift && shift.LICHLAM && shift.LICHLAM.gioBatDau) {
            const start = new Date(shift.LICHLAM.gioBatDau);
            if (now < start) {
                throw new Error('Chưa đến giờ làm việc của ca này!');
            }
        }

        // 3. Calculate working hours
        const checkInTime = new Date(attendance.checkInTime!);
        const diffMs = now.getTime() - checkInTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        const soGioLam = Math.round(diffHours * 100) / 100;

        // 4. Update record
        return repository.updateCheckOut(attendance.id, soGioLam);
    }

    async getTodayStatus(userId: string) {
        // This is legacy or for overall status. 
        // For per-shift, the frontend will use findSchedulesByEmployee which now includes status via relation (if we update repository)
        // Let's keep this as general "is anything active now?" if needed, but per-shift is preferred.
        return { status: 'use_per_shift' };
    }
}
