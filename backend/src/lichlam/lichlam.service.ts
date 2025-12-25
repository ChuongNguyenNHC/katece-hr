import * as repo from './lichlam.repository';

export class LichLamService {
    async registerSchedule(data: { nhanVienID: string; ngayLam: string; gioBatDau: string; gioKetThuc: string; diaDiem?: string; ghiChu?: string }) {
        // Basic validation
        if (!data.nhanVienID || !data.ngayLam || !data.gioBatDau || !data.gioKetThuc) {
            throw new Error("Missing required fields");
        }

        // Convert strings to Date objects
        const ngayLamDate = new Date(data.ngayLam);
        const gioBatDauDate = new Date(data.gioBatDau);
        const gioKetThucDate = new Date(data.gioKetThuc);

        if (isNaN(ngayLamDate.getTime()) || isNaN(gioBatDauDate.getTime()) || isNaN(gioKetThucDate.getTime())) {
            throw new Error("Invalid date format");
        }

        /* Commented out 7-day advance validation
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const minStartDate = new Date(today);
        minStartDate.setDate(today.getDate() + 7);

        if (ngayLamDate < minStartDate) {
            throw new Error(`Chỉ được đăng ký lịch làm trước ít nhất 7 ngày (từ ngày ${minStartDate.toLocaleDateString('vi-VN')})`);
        }
        */

        if (gioBatDauDate >= gioKetThucDate) {
            throw new Error("Start must be before End time");
        }

        return await repo.createSchedule({
            nhanVienID: data.nhanVienID,
            ngayLam: ngayLamDate,
            gioBatDau: gioBatDauDate,
            gioKetThuc: gioKetThucDate,
            diaDiem: data.diaDiem,
            ghiChu: data.ghiChu
        });
    }

    async getMySchedule(nhanVienID: string) {
        if (!nhanVienID) throw new Error("User ID is required");
        return await repo.findSchedulesByEmployee(nhanVienID);
    }
}
