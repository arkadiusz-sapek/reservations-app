import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reservation } from './models/reservation.entity';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation) private readonly reservationRepo: Repository<Reservation>,
    ) {}

    public async getAll() {
        return await this.reservationRepo.find();
    }

    public async createReservation(reservation: Reservation) {
        const newReservation = this.reservationRepo.create(reservation);
        await this.reservationRepo.save(newReservation);

        return newReservation;
    }
}
