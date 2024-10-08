import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';
import { Gender } from 'src/entities/enums/gender.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  @ApiProperty({
    description: 'email of user',
    example: 'abc@gmail.com'
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: Gender.MALE
  })
  gender: string;

  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(15)
  @ApiProperty({
    description: 'phone number of user',
    example: '+442071234567'
  })
  phoneNumber: string;

  @IsOptional()
  @ApiProperty({
    description: 'birthDate time using ISO8601',
    example: '2023-04-15'
  })
  birthDate: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'First name of the user',
    example: 'John'
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'First name of the user',
    example: 'John'
  })
  lastName: string;

  @IsOptional()
  @ApiProperty({
    description: 'Active of account',
    example: true
  })
  isActive: boolean;
}
