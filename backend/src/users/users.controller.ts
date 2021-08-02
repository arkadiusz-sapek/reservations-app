import { Controller, Get, Headers, Query } from '@nestjs/common';
import { JwtUtilsService } from 'src/auth/jwtUtils.service';
import { UserRole } from './dto/user.dto';
import { UserQueryDto } from './dto/userQuery.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private readonly utils: JwtUtilsService) {}

    @Get()
    public async getAll(@Query() queryParams: UserQueryDto) {
        console.log(queryParams);
        return await this.usersService.getAll(queryParams.role);
    }

    @Get('me')
    public async getUserData(@Headers('Authorization') auth: string) {
        const { id } = await this.utils.decode(auth);

        return await this.usersService.getUserData(id);
    }
}
