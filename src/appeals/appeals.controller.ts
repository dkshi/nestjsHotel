import { AppealsService } from "./appeals.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Redirect } from "@nestjs/common/decorators";
import { Appeal } from "./appeals.entity";
import { CreateAppealDto } from "./dto/AppealDTO";
import { ApiTags } from "@nestjs/swagger";


@Controller('appeals')
@ApiTags('Обращения')
export class AppealsController{
    constructor(private readonly appealsService: AppealsService) {}

    @Get()
    findAll(){
        return this.appealsService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id:string){
        return this.appealsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateAppeal: Appeal){
        return this.appealsService.update(+id, updateAppeal);
    }

    @Post()
    @Redirect('/contact_success.html')
    create(@Body() createAppeal: CreateAppealDto){
        return this.appealsService.create(createAppeal);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.appealsService.remove(+id);
    }

}