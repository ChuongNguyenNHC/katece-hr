import * as repository from './chamcong.repository';

export class ChamCongService {
    async checkIn(userId: string) {
        // 1. Check if user already checked in today
        const existingRecord = await repository.findTodayAttendance(userId);
        if (existingRecord) {
            throw new Error('Bạn đã check-in ngày hôm nay rồi!');
        }

        // 2. Create new check-in record
        return repository.createCheckIn(userId);
    }

    async checkOut(userId: string) {
        // 1. Find today's check-in record
        const record = await repository.findTodayAttendance(userId);
        if (!record) {
            throw new Error('Bạn chưa check-in ngày hôm nay!');
        }

        if (record.checkOutTime) {
            throw new Error('Bạn đã check-out ngày hôm nay rồi!');
        }

        // 2. Calculate working hours
        const now = new Date();
        const checkInTime = new Date(record.checkInTime!); // We know it exists if record exists, but TS might complain

        // Calculate difference in hours
        const diffMs = now.getTime() - checkInTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        // Round to 2 decimal places
        const soGioLam = Math.round(diffHours * 100) / 100;

        // 3. Update record
        return repository.updateCheckOut(record.id, soGioLam);
    }

    async getTodayStatus(userId: string) {
        const record = await repository.findTodayAttendance(userId);
        if (!record) {
            return { status: 'not_checked_in' };
        }
        if (record.checkOutTime) {
            return {
                status: 'checked_out',
                data: record
            };
        }
        return {
            status: 'checked_in',
            data: record
        };
    }
}
