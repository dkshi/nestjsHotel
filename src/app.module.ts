import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'configurations/typeorm.config';
import { Appeal } from './appeals/appeals.entity';
import { AppealsModule } from './appeals/appeals.module';
import { Guest } from './guests/guests.entity';
import { GuestsModule } from './guests/guests.module';
import { Room } from './rooms/rooms.entity';
import { RoomsModule } from './rooms/rooms.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Booking } from './bookings/bookings.entity';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    AppealsModule,
    GuestsModule, 
    RoomsModule,
    BookingsModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: 'jk355ky88',
      entities: [Guest, Appeal, Room, Booking],
      synchronize: false,
      logging: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
