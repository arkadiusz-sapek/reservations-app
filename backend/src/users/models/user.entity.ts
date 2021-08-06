import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    CreateDateColumn,
} from 'typeorm';

import { Company } from 'src/companies/models/company.entity';
import { Reservation } from 'src/reservations/models/reservation.entity';
import { UserRole } from '../dto/user.dto';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: Date;

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
