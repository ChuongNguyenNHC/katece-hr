import expressPkg from "express";
type Express = expressPkg.Express;
const express = expressPkg;
import cors from "cors";
import { TaiKhoanModule } from "./taikhoan/taikhoan.module";
import { ChamCongModule } from "./chamcong/chamcong.module";
import { HopDongSXModule } from "./hopdongsx/hopdongsx.module";
import { LichLamModule } from "./lichlam/lichlam.module";
import { SanPhamModule } from "./sanpham/sanpham.module";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/taikhoan', TaiKhoanModule);
app.use('/api/chamcong', ChamCongModule);
app.use('/api/lichlam', LichLamModule);
app.use('/api/hopdongsx', HopDongSXModule);
app.use('/api/sanpham', SanPhamModule);

export default app;

