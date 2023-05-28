import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common/decorators";
import { Room } from "./rooms.entity";
import { RoomsService } from "./rooms.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('rooms')
@ApiTags('Комнаты')
export class RoomsController{
    constructor(private readonly roomsService: RoomsService) {}

    @Get()
    findAll(){
        return this.roomsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.roomsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRoom: Room){
        return this.roomsService.update(+id, updateRoom);
    }

    @Post()
    create(@Body() createRoom: Room){
        return this.roomsService.create(createRoom);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.roomsService.remove(+id);
    }


}