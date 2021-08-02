import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

import { Company } from 'src/companies/models/company.entity';
import { Reservation } from 'src/reservations/models/reservation.entity';
import { UserRole } from '../dto/user.dto';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;

    @OneToOne(
        type => Company,
        company => company.user,
    )
    company: Company;

    @OneToMany(
        type => Reservation,
        reservation => reservation.user,
    )
    reservations: Reservation[];
}
