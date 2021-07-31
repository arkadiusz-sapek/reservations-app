import { IsISO8601, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    name: string;

    @IsISO8601()
    startDate: string;

    @IsISO8601()
    endDate: string;

    @IsISO8601()
    company: string;

    @IsISO8601()
    user: string;
}

export class ReservationDto extends CreateReservationDto {
    id: string;
}
