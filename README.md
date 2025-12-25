# Katece HR - Hệ thống Quản lý Nhân sự

Katece HR là một nền tảng quản lý nhân sự toàn diện được xây dựng trên nền tảng web hiện đại, hỗ trợ các doanh nghiệp tối ưu hóa quy trình quản lý nhân viên, hợp đồng và lịch làm việc.

## Công nghệ sử dụng

Dự án được phát triển với các công nghệ tiên tiến nhằm đảm bảo hiệu năng và khả năng mở rộng:

- **Frontend**: Next.js (App Router), Tailwind CSS, shadcn/ui.
- **Backend**: Node.js/Express (trong thư mục `backend`).
- **Cơ sở dữ liệu**: PostgreSQL.
- **ORM**: Prisma.

---

## Yêu cầu hệ thống

Trước khi cài đặt và chạy dự án, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:

- **Node.js**: Phiên bản 18 trở lên (Tải tại: https://nodejs.org)
- **PostgreSQL**: Để lưu trữ dữ liệu (Tải tại: https://www.postgresql.org)
- **Git**: Để quản lý mã nguồn (Tải tại: https://git-scm.com)

---

## Hướng dẫn cài đặt

1. **Sao chép dự án từ kho lưu trữ:**
   ```bash
   git clone https://github.com/ChuongNguyenNHC/katece-hr.git
   cd katece-hr
   ```

2. **Cài đặt các thư viện bổ trợ:**
   Mở terminal tại thư mục gốc và chạy lệnh:
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường:**
   Tạo tệp `.env` tại thư mục gốc và cấu hình đường dẫn kết nối cơ sở dữ liệu:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/dbname"
   ```
   *Lưu ý: Thay thế user, password, host, port và dbname bằng thông tin thực tế của bạn.*

---

## Quản lý Cơ sở dữ liệu (Prisma)

Dự án sử dụng Prisma để quản trị cơ sở dữ liệu. Dưới đây là các lệnh cơ bản:

- **Khởi tạo Prisma Client:**
  ```bash
  npx prisma generate
  ```

- **Đồng bộ hóa cấu trúc cơ sở dữ liệu (Migration):**
  ```bash
  npx prisma migrate dev --name <ten_migration>
  ```

- **Xem và chỉnh sửa dữ liệu trực quan:**
  ```bash
  npx prisma studio
  ```

---

## Hướng dẫn khởi chạy dự án

Để bắt đầu phát triển, bạn cần chạy đồng thời cả Backend và Frontend:

- **Khởi chạy Backend:**
  ```bash
  cd backend
  npm run dev
  ```

- **Khởi chạy Frontend:**
  ```bash
  cd frontend
  npm run dev
  ```

---

*Dự án đang trong quá trình phát triển và hoàn thiện.*
