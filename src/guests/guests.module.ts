import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appeal } from 'src/appeals/appeals.entity';
import { Room } from 'src/rooms/rooms.entity';
import { GuestsController } from './guests.controller';
import { Guest } from './guests.entity';
import { GuestsService } from './guests.service';

@Module({
    controllers: [GuestsController],
    providers: [GuestsService],
    imports: [
        TypeOrmModule.forFeature([Guest, Room, Appeal])
    ],
})

export class GuestsModule {}