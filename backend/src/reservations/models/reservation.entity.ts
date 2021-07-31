import { Company } from 'src/companies/models/company.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    consultantId: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @ManyToOne(
        type => Company,
        company => company.reservations,
    )
    @JoinColumn({ name: 'companyId' })
    company: Company;
}
