import { IsNumber, IsNotEmpty, IsMilitaryTime } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: string;

    @IsMilitaryTime()
    reservationPeriodStart: string;

    @IsMilitaryTime()
    reservationPeriodEnd: string;

    @IsNumber()
    user: string;
}

export class CompanyDto extends CreateCompanyDto {
    id: string;
}
