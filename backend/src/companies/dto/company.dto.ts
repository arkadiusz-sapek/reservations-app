import { IsNumber, IsNotEmpty, IsMilitaryTime } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsMilitaryTime()
    reservationAvailabilityStart: string;

    @IsMilitaryTime()
    reservationAvailabilityEnd: string;
}

export class CompanyDto extends CreateCompanyDto {
    id: string;
}
