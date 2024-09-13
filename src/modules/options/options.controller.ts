import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request, UseGuards } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { FindOneOptionDTO } from './dto/find-one-option.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/get-user.decorator';

@Controller('options')
@ApiTags('Options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@User() user, @Body() dto: CreateOptionDto) {
    const option = await this.optionsService.create(user, dto);
    return option;
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionsService.update(+id, updateOptionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':optionId')
  async remove(@Param('') dto: FindOneOptionDTO) {
    return await this.optionsService.remove(dto.optionId);
  }
}
