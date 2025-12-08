# 🚀 Next.js + Prisma + PostgreSQL + Tailwind + shadcn/ui

Dự án web fullstack sử dụng các công nghệ hiện đại:

- **Next.js (App Router)**
- **PostgreSQL**
- **Prisma ORM**
- **Tailwind CSS**
- **shadcn/ui**

---

## 📦 Yêu cầu môi trường

Trước khi chạy project, bạn cần cài:

- ✅ **Node.js** >= 18  
  👉 https://nodejs.org  
- ✅ **PostgreSQL** *(optional)*  
  👉 https://www.postgresql.org/download/
- ✅ **Git**  
  👉 https://git-scm.com

---

## 📥 Cài đặt project

Clone project từ GitHub:

```bash
git clone https://github.com/ChuongNguyenNHC/katece-hr.git
cd katece-hr

---

## 📦 Cài đặt dependencies
- Mở terminal tại thư mục gốc
- Chạy npm install
- Tạo file đặt tên là ".env" tại thư mục gốc và dán url database vào : "DATABASE_URL="postgresql://user:password@host:port/dbname" với password là mật khẩu db và dbname là tên db

---

## 🗄️ Prisma & Database
- Generate prisma client: npx prisma generate
- Mở prisma studio để xem db: npx prisma studio

P/S: Nếu có thay đổi dữ liệu (thêm,xóa bảng,...) phải chạy: npx prisma migrate dev --name ten_migration

---

## Chạy project:
- backend: npm run dev
- frontend: npm run start:dev
