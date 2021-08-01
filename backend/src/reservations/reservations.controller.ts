import { Body, Controller, Get, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtUtilsService } from 'src/auth/jwtUtils.service';
import { CreateReservationDto } from './dto/reservation.dto';

import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor(
        private reservationsService: ReservationsService,
        private readonly jwtUtil: JwtUtilsService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async getReservationsForUser(@Headers('Authorization') auth: string) {
        const { id } = await this.jwtUtil.decode(auth);

        return await this.reservationsService.getForUser(id);
    }

    @Post()
    async create(@Body() reservation: CreateReservationDto) {
        return this.reservationsService.create(reservation);
    }
}
