import { HttpStatus, Injectable } from "@nestjs/common";
import { Appeal } from "./appeals.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Guest } from "src/guests/guests.entity";
import { Repository } from "typeorm";
import { Room } from "src/rooms/rooms.entity";
import { CreateAppealDto } from "./dto/AppealDTO";

@Injectable()
export class AppealsService {
    constructor(
        @InjectRepository(Guest)
        private readonly guestRepository: Repository<Guest>, 
        @InjectRepository(Appeal)
        private readonly appealRepository: Repository<Appeal>, 
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>, 
      ) {}
    

      async create(appealDto: CreateAppealDto): Promise<Appeal>{
        const appeal = this.appealRepository.create();
        appeal.appeal_text = appealDto.appeal_text;
        const guest = await this.guestRepository.findOne({where: {guest_id: appealDto.guest_id}, relations: {appeals: true}})
        appeal.guest = guest;
        await this.appealRepository.save(appeal);
        return appeal;
      }

      async findAll(): Promise<Appeal[]>{
        const appeals = await this.appealRepository.find({
            relations: {
                guest: true,
            }
        
        });
        return appeals;
      }

      findOne(id: number): Promise<Appeal> {
        return this.appealRepository.findOne({
            where: {appeal_id: id},
            relations: {guest: true}
        })
      }


    async update(id: number, updatedAppeal: Appeal){
        const appeal = await this.appealRepository.findOne({where: {appeal_id: id}, relations: {guest: true,}});
        appeal.appeal_text = updatedAppeal.appeal_text;
        appeal.guest = updatedAppeal.guest;
        await this.appealRepository.save(appeal);
        return appeal;  
    }

    remove(id: number){
        this.appealRepository.delete({appeal_id: id});
    }

}





