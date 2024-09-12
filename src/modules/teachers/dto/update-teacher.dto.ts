import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";

export class UpdateTeacherDto extends UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'Subject of teacher',
    example: 'Physical'
  })
  subject: string;
}
