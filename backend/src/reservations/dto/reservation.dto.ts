import { IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    title: string;

    @IsISO8601()
    startDate: string;

    @IsISO8601()
    endDate: string;

    @IsNotEmpty()
    company: string;

    @IsNotEmpty()
    user: string;
}

export class ReservationDto extends CreateReservationDto {
    id: string;
}
