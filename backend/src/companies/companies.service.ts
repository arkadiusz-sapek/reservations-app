import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from './models/company.entity';

@Injectable()
export class CompaniesService {
    constructor(@InjectRepository(Company) private readonly companyRepo: Repository<Company>) {}

    public async getAll() {
        return await this.companyRepo.find();
    }

    public async create(company: Company) {
        const newCompany = this.companyRepo.create(company);
        await this.companyRepo.save(newCompany);

        return newCompany;
    }
}
