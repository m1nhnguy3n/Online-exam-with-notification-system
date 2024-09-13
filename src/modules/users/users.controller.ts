import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationDto } from './dto/user-pagination.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all users successfully' })
  // @UseGuards(JwtAuthGuard)
  async findAll(@Query() userPagination: UserPaginationDto) {
    return await this.usersService.findAll(userPagination);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get user by id successfully' })
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'The student has been successfully updated.' })
  async update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
