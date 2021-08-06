import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserQueryDto } from './dto/userQuery.dto';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    public async getAll(query: UserQueryDto) {
        return await this.userRepo.find({ where: query });
    }

    public async getUserByEmail(email: string) {
        const user = await this.userRepo.findOne({
            where: { email },
        });
        return user;
    }

    public async getUserData(userId: number) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
        });

        return user;
    }

    public async createUser(user: CreateUserDto) {
        const newUser = this.userRepo.create(this.transformCreateUserToModel(user));
        await this.userRepo.save(newUser);

        return newUser;
    }

    private transformCreateUserToModel(userDto: CreateUserDto): User {
        const data = classToPlain(userDto);

        return plainToClass(User, data);
    }
}
