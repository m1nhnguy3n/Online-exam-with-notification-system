<<<<<<< HEAD
import { IsEmail, isNotEmpty, IsNotEmpty, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './role.enum';
=======
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Role } from './enums/role.enum';
import { Gender } from './enums/gender.enum';
>>>>>>> 39bad04c7e3e38fa609938f7ace2c483444eaeba

@Entity('users')
@Index(['firstName', 'lastName'])
export class User extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.TEACHER
  })
  role: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true
  })
  email: string;

<<<<<<< HEAD
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


=======
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'date',
    nullable: false
  })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE
  })
  gender: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 15
  })
  phoneNumber: string;

  @Column({
    type: 'boolean',
    default: false
  })
  isActive: boolean;

  @Column({
    type: 'varchar',
    nullable: false
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  lastName: string;
>>>>>>> 39bad04c7e3e38fa609938f7ace2c483444eaeba
}
