import { CredentialsDto } from './credentials.dto';

export class CreateUserDto extends CredentialsDto {
    type: 'client' | 'consultant';
}

export class UserDto extends CreateUserDto {
    id: string;
}
