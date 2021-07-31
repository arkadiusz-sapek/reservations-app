import { Controller, Get } from '@nestjs/common';

import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor(private reservationsService: ReservationsService) {}

    @Get()
    public async getAll() {
        return await this.reservationsService.getAll();
    }
}
