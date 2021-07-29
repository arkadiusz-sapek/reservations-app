import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { TransientLoggerService } from '../logging/transient-logger.service';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly logger: TransientLoggerService,
    ) {
        this.logger.setContext(UsersService.name);
    }

    @Post('user')
    createUser(@Request() req) {
        return this.usersService.create(req.user);
    }
}
