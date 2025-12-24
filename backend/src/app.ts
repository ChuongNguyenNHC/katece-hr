import expressPkg from "express";
type Express = expressPkg.Express;
const express = expressPkg;
import cors from "cors";
import { TaiKhoanModule } from "./taikhoan/taikhoan.module.ts";
import { ChamCongModule } from "./chamcong/chamcong.module.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/taikhoan', TaiKhoanModule);
app.use('/api/chamcong', ChamCongModule);

export default app;

