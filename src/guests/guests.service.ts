import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Appeal } from "src/appeals/appeals.entity";
import { Room } from "src/rooms/rooms.entity";
import { Repository } from "typeorm";
import { CreateGuestDto } from "./dto/GuestDTO";
import { IncompleteGuestDto } from "./dto/incomplete-guest.dto";
import { Guest } from "./guests.entity";

@Injectable()
export class GuestsService {
    constructor(
        @InjectRepository(Guest)
        private readonly guestRepository: Repository<Guest>, 
        @InjectRepository(Appeal)
        private readonly appealRepository: Repository<Appeal>, 
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>, 
      ) {}
    

      async create(guestDto: CreateGuestDto): Promise<Guest>{
        const guest = this.guestRepository.create();
        guest.lastname = guestDto.lastname;
        guest.firstname = guestDto.firstname;
        guest.secondname = guestDto.secondname;
        guest.email = guestDto.email;
        guest.phone = guestDto.phone;
        const room = await this.roomRepository.findOne({where: {room_id: guestDto.room_id}, relations: {guests: true}})
        guest.room = room;
        await this.guestRepository.save(guest);
        return guest;
      }

      async findAll(): Promise<Guest[]>{
        const guests = await this.guestRepository.find({
            relations: {
                room: true,
                appeals: true
            }
        
        });
        return guests;
      }

      findOne(id: number): Promise<Guest> {
        return this.guestRepository.findOne({
            where: {guest_id: id},
            relations: {appeals: true, room: true}
        })
      }


    async findIncomplete(): Promise<IncompleteGuestDto[]> {
        const guests = await this.guestRepository.find(); 
        const incompleteGuests: IncompleteGuestDto[] = guests.map((guest) => {
          const incompleteGuest = new IncompleteGuestDto();
          incompleteGuest.guest_id = guest.guest_id;
          incompleteGuest.lastname = guest.lastname;
          incompleteGuest.secondname = guest.secondname;
          incompleteGuest.firstname = guest.firstname;
          return incompleteGuest;
        });
        return incompleteGuests; 
    }

    async update(id: number, updatedGuest: Guest){
        const guest = await this.guestRepository.findOne({where: {guest_id: id}, relations: {appeals: true, room: true}});
        guest.lastname = updatedGuest.lastname;
        guest.firstname = updatedGuest.firstname;
        guest.secondname = updatedGuest.secondname;
        guest.email = updatedGuest.email;
        guest.phone = updatedGuest.phone;
        guest.appeals = updatedGuest.appeals;
        guest.room = updatedGuest.room;
        await this.guestRepository.save(guest);
        return guest;  
    }

    remove(id: number){
        this.guestRepository.delete({guest_id: id});
    }

}



