import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

    @OneToMany(
        type => Company,
        company => company.user,
    )
    companies: Company[];

    @OneToMany(
        type => Reservation,
        reservation => reservation.user,
    )
    reservations: Reservation[];
}
