import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CredentialsDto } from 'src/users/dto/credentials.dto';
import { User } from 'src/users/models/user.entity';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(user: CredentialsDto) {
        const { email, password } = user;

        const emailExists = await this.usersService.getUserByEmail(email);

        if (emailExists) {
            throw new HttpException('Email is already taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = await this.usersService.createUser(email, hash);

        const userData = await this.signToken(newUser);

        return userData;
    }

    async login(login: CredentialsDto) {
        const { email, password } = login;

        const user = await this.usersService.getUserByEmail(email);

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const comparePasswords = await bcrypt.compare(password, user.password);

        if (!comparePasswords) {
            throw new HttpException('Invalid credentials', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const userData = await this.signToken(user);

        return userData;
    }

    async signToken({ id, email }: User) {
        const token = this.jwtService.sign({ id });

        return {
            id,
            email,
            token,
        };
    }
}
