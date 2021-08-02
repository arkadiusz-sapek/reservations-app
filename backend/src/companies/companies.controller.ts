import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { JwtUtilsService } from 'src/auth/jwtUtils.service';

import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(
        private companiesService: CompaniesService,
        private readonly jwtUtil: JwtUtilsService,
    ) {}

    @Get()
    public async getAll() {
        return await this.companiesService.getAll();
    }

    @Get('client')
    public async getForClient(@Headers('Authorization') auth: string) {
        const { id } = await this.jwtUtil.decode(auth);

        return await this.companiesService.getForClient(id);
    }

    @Post()
    async create(@Body() company: CreateCompanyDto, @Headers('Authorization') auth: string) {
        const { id } = await this.jwtUtil.decode(auth);

        return this.companiesService.create(company, id);
    }
}
