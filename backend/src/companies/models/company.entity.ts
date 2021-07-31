import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { Reservation } from 'src/reservations/models/reservation.entity';
import { User } from 'src/users/models/user.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    reservationPeriodStart: string;

    @Column()
    reservationPeriodEnd: string;

    @ManyToOne(
        type => User,
        user => user.companies,
    )
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(
        type => Reservation,
        reservation => reservation.company,
    )
    reservations: Reservation[];
}
