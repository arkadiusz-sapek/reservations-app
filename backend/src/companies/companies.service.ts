import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass, classToPlain } from 'class-transformer';

import { CreateCompanyDto } from './dto/company.dto';
import { Company } from './models/company.entity';

@Injectable()
export class CompaniesService {
    constructor(@InjectRepository(Company) private readonly companyRepo: Repository<Company>) {}

    public async getAll() {
        return await this.companyRepo.find();
    }

    public async getForClient(userId: number) {
        return await this.companyRepo.findOne({ where: { user: userId } });
    }

    public async create(company: CreateCompanyDto, userId: number) {
        const newCompany = this.companyRepo.create(
            this.transformCreateCompanyToModel(company, userId),
        );
        await this.companyRepo.save(newCompany);

        return newCompany;
    }

    private transformCreateCompanyToModel(companyDto: CreateCompanyDto, userId: number): Company {
        const data = classToPlain({ ...companyDto, user: userId });

        return plainToClass(Company, data);
    }
}
