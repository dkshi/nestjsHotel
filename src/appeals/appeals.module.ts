import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from 'src/guests/guests.entity';
import { Room } from 'src/rooms/rooms.entity';
import { AppealsController } from './appeals.controller';
import { Appeal } from './appeals.entity';
import { AppealsService } from './appeals.service';

@Module({
    controllers: [AppealsController],
    providers: [AppealsService],
    imports: [
        TypeOrmModule.forFeature([Guest, Room, Appeal])
    ],
})

export class AppealsModule {}