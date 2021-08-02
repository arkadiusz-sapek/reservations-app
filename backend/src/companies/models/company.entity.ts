import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Reservation } from 'src/reservations/models/reservation.entity';
import { User } from 'src/users/models/user.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    reservationAvailabilityStart: string;

    @Column()
    reservationAvailabilityEnd: string;

    @OneToOne(
        type => User,
        user => user.company,
    )
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(
        type => Reservation,
        reservation => reservation.company,
    )
    reservations: Reservation[];
}
