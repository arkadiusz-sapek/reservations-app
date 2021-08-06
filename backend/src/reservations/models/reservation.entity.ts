import { Company } from 'src/companies/models/company.entity';
import { User } from 'src/users/models/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: Date;

    @Column()
    title: string;

    @Column()
    description: string;

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

    @ManyToOne(
        type => User,
        user => user.reservations,
    )
    @JoinColumn({ name: 'userId' })
    user: User;
}
