import { IsNumber, IsNotEmpty, IsMilitaryTime, IsString } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsMilitaryTime()
    reservationAvailabilityStart: string;

    @IsMilitaryTime()
    reservationAvailabilityEnd: string;
}

export class CompanyDto extends CreateCompanyDto {
    id: number;
}
