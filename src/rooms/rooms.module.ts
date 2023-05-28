import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Appeal } from 'src/appeals/appeals.entity';
import { Guest } from 'src/guests/guests.entity';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.entity';
import { RoomsService } from './rooms.service';

@Module({
    controllers: [RoomsController],
    providers: [RoomsService],
    imports: [
        TypeOrmModule.forFeature([Guest, Room, Appeal])
    ],
})

export class RoomsModule {}