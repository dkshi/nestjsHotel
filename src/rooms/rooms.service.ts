import { HttpStatus, Injectable } from "@nestjs/common";
import { Room } from "./rooms.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Appeal } from "src/appeals/appeals.entity";
import { Repository } from "typeorm";
import { Guest } from "src/guests/guests.entity";
import { CreateRoomDto } from "./dto/RoomDTO";

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Guest)
        private readonly guestRepository: Repository<Guest>, 
        @InjectRepository(Appeal)
        private readonly appealRepository: Repository<Appeal>, 
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>, 
      ) {}
    

      async create(roomDto: CreateRoomDto): Promise<Room>{
        const room = this.roomRepository.create();
        room.room_id = roomDto.room_id;
        room.capacity = roomDto.capacity;
        room.beds_count = roomDto.beds_count;
        room.description = roomDto.description;
        const guests = await this.guestRepository.findBy({room: room})
        room.guests = guests;
        await this.roomRepository.save(room);
        return room;
      }

      async findAll(): Promise<Room[]>{
        const rooms = await this.roomRepository.find({
            relations: {
                guests: true,
            }
        
        });
        return rooms;
      }

      findOne(id: number): Promise<Room> {
        return this.roomRepository.findOne({
            where: {room_id: id},
            relations: {guests: true}
        })
      }

    async update(id: number, updatedRoom: Room){
        const room = await this.roomRepository.findOne({where: {room_id: id}, relations: {guests: true}});
        room.capacity = updatedRoom.capacity;
        room.beds_count = updatedRoom.beds_count;
        room.description = updatedRoom.description;
        room.guests = updatedRoom.guests;
        await this.roomRepository.save(room);
        return room;  
    }

    remove(id: number){
        this.roomRepository.delete({room_id: id});
    }

}