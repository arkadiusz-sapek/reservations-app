import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass, classToPlain } from 'class-transformer';

import { CreateReservationDto } from './dto/reservation.dto';
import { Reservation } from './models/reservation.entity';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation) private readonly reservationRepo: Repository<Reservation>,
    ) {}

    public async getAll() {
        return await this.reservationRepo.find();
    }

    public async getForUser(userId: string) {
        return await this.reservationRepo.find({ where: { user: userId } });
    }

    public async create(reservation: CreateReservationDto) {
        const newReservation = this.reservationRepo.create(
            this.transformCreateReservationToModel(reservation),
        );
        await this.reservationRepo.save(newReservation);

        return newReservation;
    }

    private transformCreateReservationToModel(userDto: CreateReservationDto): Reservation {
        const data = classToPlain(userDto);

        return plainToClass(Reservation, data);
    }
}
