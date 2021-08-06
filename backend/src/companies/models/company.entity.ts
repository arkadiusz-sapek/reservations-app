import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToMany,
    OneToOne,
    CreateDateColumn,
} from 'typeorm';

import { Reservation } from 'src/reservations/models/reservation.entity';
import { User } from 'src/users/models/user.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: Date;

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
