import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(3)
	fullName: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;
}
