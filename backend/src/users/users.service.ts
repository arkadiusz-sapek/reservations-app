import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './models/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public async getAll() {
        return await this.userRepo.find();
    }

    public async getUserByEmail(email: string) {
        const user = await this.userRepo.findOne({
            where: { email },
        });
        return user;
    }

    public async createUser(email: string, hashedPassword: string) {
        const newUser = this.userRepo.create({
            email,
            password: hashedPassword,
        });
        await this.userRepo.save(newUser);

        return newUser;
    }
}
