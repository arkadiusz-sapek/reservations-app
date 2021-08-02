import { IsEnum } from 'class-validator';

import { UserRole } from './user.dto';

export class UserQueryDto {
    @IsEnum(UserRole)
    role: UserRole;
}
