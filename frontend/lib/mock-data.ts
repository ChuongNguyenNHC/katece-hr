import { 
  Taikhoan, 
  Hopdongsx, 
  Yeucauot, 
  Sanpham,
  Congdoan,
  Phancongsanxuat,
  Hopdonglaodong,
  Bangluong,
  Phanhoiluong,
  Chamcong,
  Tosanxuat,
} from '@/types/schema';

// Mock Teams (Tosanxuat)
export const mockTeams: Tosanxuat[] = [
    {
        id: "t1",
        created_at: "2023-01-01",
        toTruongID: "2", // Tran Thi B is Team Leader
        tenTo: "Tổ May 1"
    },
    {
        id: "t2",
        created_at: "2023-01-01",
        toTruongID: "5", // Hoang Van E is Team Leader
        tenTo: "Tổ Hoàn Thiện"
    }
];

// Mock Employees (Taikhoan)
export const mockEmployees: Taikhoan[] = [
  {
    id: "1",
    username: "ajohnson",
    fullName: "Nguyễn Văn A",
    position: "Công nhân may",
    phone: "0901234567",
    cccd: "012345678901",
    email: "nguyenvana@katece.com",
    createdAt: "2023-01-15T09:00:00Z",
    trangThaiTaiKhoan: "active",
    paidLeaveDayss: 12,
    unpaidLeaveDays: 0,
    nguoiQuanLyID: "2",
    toSanXuatID: "t1",
    TOSANXUAT: mockTeams[0],
    NguoiQuanLy: { // Circular ref simulation
        id: "2",
        username: "swilliams",
        fullName: "Trần Thị B",
        position: "Quản lý chuyền",
        phone: "0901234568",
        cccd: "012345678902",
        email: "tranthib@katece.com",
        createdAt: "2023-02-01T09:00:00Z"
    } as Taikhoan
  },
  {
    id: "2",
    username: "swilliams",
    fullName: "Trần Thị B",
    position: "Quản lý chuyền",
    phone: "0901234568",
    cccd: "012345678902",
    email: "tranthib@katece.com",
    createdAt: "2023-02-01T09:00:00Z",
    trangThaiTaiKhoan: "active",
    paidLeaveDayss: 10,
    unpaidLeaveDays: 1,
    toSanXuatID: "t1",
    TOSANXUAT: mockTeams[0]
  },
  {
    id: "3",
    username: "mbrown",
    fullName: "Lê Văn C",
    position: "Công nhân cắt",
    phone: "0901234569",
    cccd: "012345678903",
    email: "levanc@katece.com",
    createdAt: "2023-03-10T09:00:00Z",
    trangThaiTaiKhoan: "active",
    paidLeaveDayss: 12,
    unpaidLeaveDays: 0,
    nguoiQuanLyID: "2",
    toSanXuatID: "t1",
    TOSANXUAT: mockTeams[0],
    NguoiQuanLy: {
        id: "2",
        username: "swilliams",
        fullName: "Trần Thị B",
        position: "Quản lý chuyền",
        phone: "0901234568",
        cccd: "012345678902",
        email: "tranthib@katece.com",
        createdAt: "2023-02-01T09:00:00Z"
    } as Taikhoan
  },
  {
    id: "4",
    username: "edavis",
    fullName: "Phạm Thị D",
    position: "Công nhân đóng gói",
    phone: "0901234570",
    cccd: "012345678904",
    email: "phamthid@katece.com",
    createdAt: "2023-04-05T09:00:00Z",
    trangThaiTaiKhoan: "active",
    paidLeaveDayss: 11,
    unpaidLeaveDays: 0,
    nguoiQuanLyID: "5",
    toSanXuatID: "t2",
    TOSANXUAT: mockTeams[1],
     NguoiQuanLy: {
        id: "5",
        username: "dwilson",
        fullName: "Hoàng Văn E",
        position: "Công nhân kiểm hàng",
        phone: "0901234571",
        cccd: "012345678905",
        email: "hoangvane@katece.com",
        createdAt: "2023-05-20T09:00:00Z"
    } as Taikhoan
  },
  {
    id: "5",
    username: "dwilson",
    fullName: "Hoàng Văn E",
    position: "Công nhân kiểm hàng",
    phone: "0901234571",
    cccd: "012345678905",
    email: "hoangvane@katece.com",
    createdAt: "2023-05-20T09:00:00Z",
    trangThaiTaiKhoan: "active",
    paidLeaveDayss: 12,
    unpaidLeaveDays: 2,
    nguoiQuanLyID: "2",
    toSanXuatID: "t2",
    TOSANXUAT: mockTeams[1]
  },
];

// Mock Stages (Congdoan)
export const mockStages: Congdoan[] = [
  { id: "s1", created_at: "2023-01-01", tenCongDoan: "Cắt vải", donGia: 15 },
  { id: "s2", created_at: "2023-01-01", tenCongDoan: "May ráp", donGia: 25 },
  { id: "s3", created_at: "2023-01-01", tenCongDoan: "Ủi hoàn thiện", donGia: 10 },
  { id: "s4", created_at: "2023-01-01", tenCongDoan: "Kiểm tra", donGia: 30 },
];

// Mock Products (Sanpham)
export const mockProducts: Sanpham[] = [
  {
    id: "p1",
    created_at: "2023-01-01",
    tenSP: "Áo sơ mi nam",
    CONGDOAN: [mockStages[0], mockStages[1], mockStages[2]]
  },
  {
    id: "p2",
    created_at: "2023-01-01",
    tenSP: "Quần tây",
    CONGDOAN: [mockStages[3]]
  },
  {
    id: "p3",
    created_at: "2023-01-01",
    tenSP: "Váy công sở",
    CONGDOAN: []
  },
];

// Mock Assignments (Phancongsanxuat) used as "Contract Details"
const mockAssignments: Phancongsanxuat[] = [
    { id: "pcsx1", created_at: "2023-01-01", sanPhamID: "p1", soLuong: 100, SANPHAM: mockProducts[0] },
    { id: "pcsx2", created_at: "2023-01-01", sanPhamID: "p2", soLuong: 50, SANPHAM: mockProducts[1] }
];

// Mock Production Contracts (Hopdongsx)
export const mockContracts: Hopdongsx[] = [
  {
    id: "c1",
    created_at: "2023-01-01T00:00:00Z",
    tenHopDongSX: "Lô hàng A-2023",
    nhanVienID: "2", // Sarah (Manager)
    loaiLuong: "Fixed",
    giaTriLuong: 50000,
    ngayBatDau: "2023-01-01",
    ngayKetThuc: "2023-12-31",
    trangThaiHopDongSX: "active",
    TAIKHOAN: mockEmployees.find(e => e.id === "2"),
    PHANCONGSANXUAT: [mockAssignments[0]]
  },
  {
    id: "c2",
    created_at: "2023-06-01T00:00:00Z",
    tenHopDongSX: "Đơn hàng gấp B",
    nhanVienID: "1", // Alex
    loaiLuong: "Piecework",
    giaTriLuong: 0,
    ngayBatDau: "2023-06-01",
    ngayKetThuc: "2024-06-01",
    trangThaiHopDongSX: "active",
    TAIKHOAN: mockEmployees.find(e => e.id === "1"),
    PHANCONGSANXUAT: [mockAssignments[1]]
  }
];

// Mock Labor Contracts (Hopdonglaodong)
export const mockLaborContracts: Hopdonglaodong[] = [
    {
        id: "lc1",
        created_at: "2023-01-01",
        nhanVienID: "1",
        tenHopDong: "Hợp đồng chính thức",
        loaiLuong: "Monthly",
        giaTriLuong: 2000,
        ngayBatDau: "2023-01-01",
        ngayKetThuc: "2024-01-01",
        trangThaiHDLD: "active",
        diaChiLamViec: "Xưởng 1",
        TAIKHOAN: mockEmployees.find(e => e.id === "1")
    },
    {
        id: "lc2",
        created_at: "2023-02-01",
        nhanVienID: "2",
        tenHopDong: "Hợp đồng quản lý",
        loaiLuong: "Monthly",
        giaTriLuong: 3500,
        ngayBatDau: "2023-02-01",
        ngayKetThuc: "2025-02-01",
        trangThaiHDLD: "active",
        diaChiLamViec: "Văn phòng xưởng",
        TAIKHOAN: mockEmployees.find(e => e.id === "2")
    }
];

// Mock Salaries (Bangluong)
// Assuming current month calculation
export const mockSalaries: Bangluong[] = [
    {
        id: "bl1",
        created_at: "2023-11-25",
        thangLuong: "2023-11-01",
        maNguoiDung: "1", // Alex
        luongCoBan: 2000,
        tienOT: 150,
        phuCap: 100,
        tienThuong: 50,
        khauTru: 20,
        tongLuong: 2280,
        trangThaiDuyetLuong: "approved",
        TAIKHOAN: mockEmployees.find(e => e.id === "1"),
        soNgayNghiCoPhep: 1,
        soNgayNghiKhongPhep: 0,
        soGioOT: 10
    },
    {
        id: "bl2",
        created_at: "2023-11-25",
        thangLuong: "2023-11-01",
        maNguoiDung: "2", // Sarah
        luongCoBan: 3500,
        tienOT: 0,
        phuCap: 200,
        tienThuong: 500,
        khauTru: 50,
        tongLuong: 4150,
        trangThaiDuyetLuong: "pending",
        TAIKHOAN: mockEmployees.find(e => e.id === "2"),
         soNgayNghiCoPhep: 0,
        soNgayNghiKhongPhep: 0,
        soGioOT: 0
    }
];

// Mock Feedbacks (Phanhoiluong)
export const mockFeedbacks: Phanhoiluong[] = [
    {
        id: "ph1",
        created_at: "2023-11-26",
        nguoiGuiID: "1",
        phieuLuongID: "bl1",
        noiDung: "Giờ tăng ca ngày Chủ nhật tính chưa đúng.",
        trangThaiPhanHoi: "processing",
        nguoiDuyetID: "2"
    }
];


// Mock Requests (Yeucauot)
export const mockRequests: Yeucauot[] = [
  {
    id: "r1",
    created_at: "2023-10-25T10:00:00Z",
    soGioOT: 2,
    ngayGui: "2023-10-25",
    ngayOT: "2023-10-26",
    trangThaiDonOT: "processing",
    nguoiGuiID: "1", // Alex
    NguoiGui: mockEmployees.find(e => e.id === "1"),
  },
  {
    id: "r2",
    created_at: "2023-10-24T14:00:00Z",
    soGioOT: 4,
    ngayGui: "2023-10-24",
    ngayOT: "2023-10-27",
    trangThaiDonOT: "approved",
    NguoiGui: mockEmployees.find(e => e.id === "3"),
  }
];

// Mock Attendance (Chamcong)
export const mockAttendance: Chamcong[] = [
    // Employee 1 (Alex/Nguyen Van A)
    {
        id: "cc1",
        created_at: "2025-12-01",
        checkInTime: "2025-12-01T08:00:00Z",
        checkOutTime: "2025-12-01T17:00:00Z",
        soGioLam: 8,
        lichLamID: "ll1",
        nhanVienID: "1"
    },
    {
        id: "cc2",
        created_at: "2025-12-02",
        checkInTime: "2025-12-02T08:15:00Z",
        checkOutTime: "2025-12-02T17:10:00Z",
        soGioLam: 8,
        lichLamID: "ll1",
        nhanVienID: "1"
    },
    {
        id: "cc3",
        created_at: "2025-12-03",
        checkInTime: "2025-12-03T07:55:00Z",
        checkOutTime: "2025-12-03T17:05:00Z",
        soGioLam: 8,
        lichLamID: "ll1",
        nhanVienID: "1"
    },
    // ... Recent days
    {
        id: "cc4",
        created_at: "2025-12-22",
        checkInTime: "2025-12-22T08:00:00Z",
        checkOutTime: "2025-12-22T17:00:00Z",
        soGioLam: 8,
        lichLamID: "ll1",
        nhanVienID: "1"
    },
     {
        id: "cc5",
        created_at: "2025-12-23",
        checkInTime: "2025-12-23T07:50:00Z",
        // No check out yet for today
        checkOutTime: undefined,
        soGioLam: 0,
        lichLamID: "ll1",
        nhanVienID: "1"
    },

    // Employee 2 (Sarah/Manager) - Simulating HR data
    {
        id: "cc_hr_1",
        created_at: "2025-12-01",
        checkInTime: "2025-12-01T08:30:00Z",
        checkOutTime: "2025-12-01T17:30:00Z",
        soGioLam: 8,
        lichLamID: "ll2",
        nhanVienID: "2"
    },
    {
        id: "cc_hr_2",
        created_at: "2025-12-23",
        checkInTime: "2025-12-23T08:30:00Z",
        checkOutTime: undefined,
        soGioLam: 8,
        lichLamID: "ll2",
        nhanVienID: "2"
    }
];


