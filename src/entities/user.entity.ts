import { IsEmail, isNotEmpty, IsNotEmpty, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './role.enum';

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

	@Column()
	@IsNotEmpty({ message: 'Full name is required' })
	password: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.Student,
	  })
	  role: UserRole;


}
