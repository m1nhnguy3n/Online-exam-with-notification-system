import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty({ message: 'Full name is required' })
	@Length(2, 50, { message: 'Full name must be between 2 and 50 characters' })
	fullName: string;

	@Column({ unique: true })
	@IsEmail({}, { message: 'Email must be a valid email address' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string;
}
