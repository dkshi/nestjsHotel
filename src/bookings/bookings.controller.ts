import { Body, Controller, Delete, Get, Param, Post, Put, Redirect } from "@nestjs/common/decorators";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateBookingDto } from "./dto/BookingDTO";
import { Booking } from "./bookings.entity";
import { BookingsService } from "./bookings.service";

@Controller('bookings')
@ApiTags('Бронирование')
export class BookingsController{
    constructor(private readonly bookingsService: BookingsService) {}

    @Get()
    findAll(){
        return this.bookingsService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id:string){
        return this.bookingsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBooking: Booking){
        return this.bookingsService.update(+id, updateBooking);
    }

    @Post()
    @Redirect('/booking_success.html')
    create(@Body() createBooking: CreateBookingDto){
        return this.bookingsService.create(createBooking);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.bookingsService.remove(+id);
    }
    
}