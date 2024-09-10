import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';


@Controller('options')
@ApiTags('Options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  async create(@Request() req, @Body() dto: CreateOptionDto) {
    const userID: UUID = req.user;
    // const option = await this.optionsService.create(userID, dto);
    const option = await this.optionsService.create('66dc2e33-c228-800b-a7e4-d82f3ba6bdd1', dto);
    
    return {
      success:true,
      data: option,
      message: "Create success"
    };
  }

  @Get()
  findAll() {
    return this.optionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionsService.update(+id, updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionsService.remove(+id);
  }
}
