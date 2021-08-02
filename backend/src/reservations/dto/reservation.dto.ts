import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsISO8601()
    startDate: string;

    @IsISO8601()
    endDate: string;

    @IsNotEmpty()
    @IsString()
    company: string;

    @IsNotEmpty()
    @IsString()
    user: string;
}

export class ReservationDto extends CreateReservationDto {
    id: string;
}
