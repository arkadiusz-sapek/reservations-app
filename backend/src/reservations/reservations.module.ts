import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './models/reservation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation])],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})
export class ReservationsModule {}