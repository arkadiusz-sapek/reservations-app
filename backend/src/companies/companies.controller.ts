import { Body, Controller, Get, Post } from '@nestjs/common';

import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) {}

    @Get()
    public async getAll() {
        return await this.companiesService.getAll();
    }

    @Post()
    async create(@Body() company) {
        return this.companiesService.create(company);
    }
}
