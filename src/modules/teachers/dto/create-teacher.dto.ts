import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateTeacherDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'Subject of teacher',
    example: 'Physical'
  })
  subject: string;
}
