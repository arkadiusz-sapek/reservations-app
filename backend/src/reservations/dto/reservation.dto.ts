import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
    @IsNumber()
    company: string;

    @IsNotEmpty()
    @IsNumber()
    user: string;
}

export class ReservationDto extends CreateReservationDto {
    id: number;
}
