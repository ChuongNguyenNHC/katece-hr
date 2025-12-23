export type TrangThaiTaiKhoan = 'active' | 'inactive';
export type TrangThaiHopDong = 'active' | 'inactive';
export type TrangThaiDonOT = 'processing' | 'approved' | 'declined';

// Based on Prisma Schema models

export interface Taikhoan {
  id: string;
  username: string;
  fullName: string;
  position: string;
  phone: string;
  cccd: string;
  email: string;
  createdAt: string; // DateTime @default(now())
  password?: string;
  paidLeaveDayss?: number; // Int? @db.SmallInt
  unpaidLeaveDays?: number; // Int? @db.SmallInt
  trangThaiTaiKhoan?: string; // String?
  nguoiQuanLyID?: string; // @db.Uuid
  toSanXuatID?: string; // @db.Uuid
  
  // Relations (simplified)
  NguoiQuanLy?: Taikhoan;
  TOSANXUAT?: Tosanxuat;
}

export interface Chamcong {
  id: string;
  created_at: string;
  checkInTime?: string;
  checkOutTime?: string;
  soGioLam?: number; // Decimal
  lichLamID?: string;
  nhanVienID?: string;
  
  // Relations
  CHITIETLICHLAM?: Chitietlichlam;
  TAIKHOAN?: Taikhoan;
}

export interface Chitietlichlam {
  id: string;
  created_at: string;
  ngayLam?: string; // @db.Date
  nhanVienID?: string;
  lichLamID?: string;
  
  // Relations
  LICHLAM?: Lichlam;
  TAIKHOAN?: Taikhoan;
}

export interface Lichlam {
  id: string;
  created_at: string;
  gioBatDau?: string;
  gioKetThuc?: string;
  ghiChu?: string;
  diaDiem?: string;
  trangThai?: string;
  
  // Relations
  CHITIETLICHLAM?: Chitietlichlam[];
}

export interface Yeucauot {
  id: string;
  created_at: string;
  soGioOT?: number; // Int? @db.SmallInt
  ngayGui?: string; // @db.Date
  ngayOT?: string; // @db.Date
  trangThaiDonOT?: string;
  nguoiDuyetID?: string;
  nguoiGuiID?: string;
  
  // Relations
  NguoiGui?: Taikhoan;
  NguoiDuyet?: Taikhoan;
}

export interface Phancongsanxuat {
  id: string;
  created_at: string;
  hopDongID?: string;
  sanPhamID?: string;
  congDoanID?: string;
  trangThai?: string;
  toSanXuatID?: string;
  
  // Relations
  HOPDONGSX?: Hopdongsx;
  SANPHAM?: Sanpham;
  CONGDOAN?: Congdoan;
  TOSANXUAT?: Tosanxuat;

  // Virtual / Frontend only
  soLuong?: number;
}

export interface Hopdongsx {
  id: string;
  created_at: string;
  tenHopDongSX?: string;
  nhanVienID?: string;
  loaiLuong?: string;
  giaTriLuong?: number; // Decimal
  ngayBatDau?: string; // @db.Date
  ngayKetThuc?: string; // @db.Date
  trangThaiHopDongSX?: string;
  tenKhachHang?: string;
  chinhSachPhat?: string;
  tienPhat?: number; // Decimal
  
  // Relations
  TAIKHOAN?: Taikhoan; // NhanVien
  PHANCONGSANXUAT?: Phancongsanxuat[];
}

export interface Sanpham {
  id: string;
  created_at: string;
  tenSP?: string;
  
  // Relations
  CONGDOAN_SANPHAM?: CongdoanSanpham[];
  PHANCONGSANXUAT?: Phancongsanxuat[];
  
  // Helper for UI
  CONGDOAN?: Congdoan[];
}

export interface Congdoan {
  id: string;
  created_at: string;
  tenCongDoan?: string;
  donGia?: number; // Decimal
  
  // Relations
  CONGDOAN_SANPHAM?: CongdoanSanpham[];
  PHANCONGSANXUAT?: Phancongsanxuat[];
}

export interface CongdoanSanpham {
  id: string;
  created_at: string;
  sanPhamID?: string;
  congDoanID?: string;
  
  // Relations
  CONGDOAN?: Congdoan;
  SANPHAM?: Sanpham;
}

export interface Tosanxuat {
  id: string;
  created_at: string;
  toTruongID?: string;
  tenTo?: string; // Team Name
  
  // Relations
  TAIKHOAN_DS?: Taikhoan[];
  ToTruong?: Taikhoan;
}

export interface Hopdonglaodong {
  id: string;
  created_at: string;
  nhanVienID?: string;
  loaiHopDongID?: string; 
  tenHopDong?: string;
  loaiLuong?: string;
  giaTriLuong?: number; // Decimal
  ngayBatDau?: string; // @db.Date
  ngayKetThuc?: string; // @db.Date
  trangThaiHDLD?: string;
  diaChiLamViec?: string;
  
  // Relations
  LOAIHOPDONG?: Loaihopdong;
  TAIKHOAN?: Taikhoan; // NhanVien
  LICHSULUONG?: Lichsuluong[];
}

export interface Loaihopdong {
  id: string;
  created_at: string;
  tenLoaiHopDong?: string;
  nhanVienID?: string;
  loaiLuong?: string;
  giaTriLuong?: number; // Decimal
  ngayBatDau?: string;
  ngayKetThuc?: string;
  trangThaiLHD?: string;
}

export interface Lichsuluong {
  id: string;
  created_at: string;
  soTien?: number; // Decimal
  hopDongLDID?: string;
}

export interface Bangluong {
  id: string;
  created_at: string;
  thangLuong?: string;
  luongCoBan?: number;
  tienOT?: number;
  phuCap?: number;
  tienThuong?: number;
  khauTru?: number;
  tongLuong?: number;
  trangThaiDuyetLuong?: string;
  keToanID?: string;
  maNguoiDung?: string;
  soNgayNghiCoPhep?: number;
  soNgayNghiKhongPhep?: number;
  soGioOT?: number;
  maNguoiChinhSua?: string;
  
  // Relations
  TAIKHOAN?: Taikhoan;
}

export interface Yeucaunghi {
  id: string;
  created_at: string;
  soNgayNghi?: number;
  ngayBatDauNghi?: string;
  ngayKetThucNghi?: string;
  ngayGui?: string;
  trangThaiDuyetNghi?: string;
  nguoiGuiID?: string;
  nguoiDuyetID?: string;
}

export interface Phanhoiluong {
    id: string;
    created_at: string;
    noiDung?: string;
    trangThaiPhanHoi?: string;
    nguoiDuyetID?: string;
    nguoiGuiID?: string;
    nguoiXuLyID?: string;
    phieuLuongID?: string;
}

export interface Vatlieu {
    id: string;
    tenVatLieu?: string;
    soLuongTon?: number;
    donViTinh?: string;
    nhaCungCapID?: string;
}

export interface Nhacungcap {
    id: string;
    tenNhaCungCap?: string;
    diaChi?: string;
    soDienThoai?: string;
    email?: string;
    loaiNCC?: string;
    trangThaiNCC?: string;
}
