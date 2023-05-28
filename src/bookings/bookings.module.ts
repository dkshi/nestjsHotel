import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from 'src/guests/guests.entity';
import { Room } from 'src/rooms/rooms.entity';
import { Appeal } from 'src/appeals/appeals.entity';
import { Booking } from './bookings.entity';

@Module({
    controllers: [BookingsController],
    providers: [BookingsService],
    imports: [
        TypeOrmModule.forFeature([Guest, Room, Appeal, Booking])
    ]
})

export class BookingsModule {}