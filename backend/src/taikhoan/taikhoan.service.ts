import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as repository from './taikhoan.repository.ts';

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
            { id: user.id, username: user.username, email: user.email },
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
}