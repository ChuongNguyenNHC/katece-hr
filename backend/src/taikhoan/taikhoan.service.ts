import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as repository from './taikhoan.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class TaiKhoanService {
    async login(login: string, password: string) {
        const user = await repository.getUserByLogin(login);
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                email: user.email, 
                position: user.position,
                toSanXuatID: user.toSanXuatID 
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        return { token, user };
    }

    async register(input: {
        username: string;
        email: string;
        password: string;
        fullName: string;
        position: string;
        phone: string;
        cccd: string;
    })  {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await repository.createUser({
            ...input, password: hashedPassword });
            return user;
        }

    async createWorker(leaderId: string, leaderToSanXuatID: string | null | undefined, input: {
        fullName: string;
        phone: string;
        cccd: string;
        username: string;
        email: string;
    }) {

        // Default password for workers (can be changed later)
        const hashedPassword = await bcrypt.hash("123456", 10);
        
        return repository.createUser({
            ...input,
            email: input.email,
            password: hashedPassword,
            position: "Cong nhan",
            toSanXuatID: leaderToSanXuatID || undefined 
        });
    }

    async createEmployee(input: {
        fullName: string;
        phone: string;
        cccd: string;
        username: string;
        email: string;
        position: string;
        password?: string;
    }) {
        // Prevent creating "Worker" roles via this API (Team Leader responsibility)
        if (input.position === "Cong nhan") {
            throw new Error("Quản lý sản xuất không được phép thêm Công nhân may. Vui lòng để Tổ trưởng thực hiện.");
        }

        const password = input.password || "123456";
        const hashedPassword = await bcrypt.hash(password, 10);

        return repository.createUser({
            ...input,
            password: hashedPassword
        });
    }

    async getEmployees() {
        return repository.getEmployees();
    }

    async getWorkers() {
        return repository.getWorkers();
    }

    async assignWorkerToTeam(userId: string, toSanXuatID: string) {
        return repository.updateUserTeam(userId, toSanXuatID);
    }

    async getProductionTeams() {
        return repository.getProductionTeams();
    }
}