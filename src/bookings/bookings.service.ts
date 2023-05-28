import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookingDto } from "./dto/BookingDTO";
import { Booking } from "./bookings.entity";

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking> 
      ) {}
    

      async create(bookingDto: CreateBookingDto): Promise<Booking>{
        const booking = this.bookingRepository.create();
        booking.email = bookingDto.email;
        booking.phone = bookingDto.phone;
        booking.startdate = bookingDto.startdate;
        booking.enddate = bookingDto.enddate;
        await this.bookingRepository.save(booking);
        return booking;
      }

      async findAll(): Promise<Booking[]>{
        const bookings = await this.bookingRepository.find();
        return bookings;
      }

      findOne(id: number): Promise<Booking> {
        return this.bookingRepository.findOne({
            where: {booking_id: id}
        })
      }


    async update(id: number, updatedBooking: Booking){
        const booking = await this.bookingRepository.findOne({where: {booking_id: id}});
        booking.email = updatedBooking.email;
        booking.phone = updatedBooking.phone;
        booking.startdate = updatedBooking.startdate;
        booking.enddate = updatedBooking.enddate;
        await this.bookingRepository.save(booking);
        return booking;  
    }

    remove(id: number){
        this.bookingRepository.delete({booking_id: id});
    }

}





