import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './models/company.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Company])],

    controllers: [CompaniesController],
    providers: [CompaniesService],
})
export class CompaniesModule {}
