import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student'
}

export enum Gender {
  MALE = 'M',
  FEMALE = 'F'
}

export enum ActiveStatus {
  ACTIVE = 'active'
}
@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TEACHER
  })
  role: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255
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
    default: true
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
}
