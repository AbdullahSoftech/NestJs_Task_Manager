import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(email: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('Email already in use')
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ email, password: hashedPassword });
        return await this.userRepository.save(user);
    }

    async login(email: string, password: String): Promise<{ accessToken: string }> {
        const userExists = await this.userRepository.findOne({ where: { email } });
        if (!userExists) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials'); // Password mismatch
        }

        // Generate the JWT payload and access token
        const payload = { email: userExists.email, sub: userExists.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
