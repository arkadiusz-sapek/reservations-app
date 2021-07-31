import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Company } from 'src/companies/models/company.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    type: 'client' | 'consultant';

    @OneToMany(
        type => Company,
        company => company.user,
    )
    companies: Company[];
}
