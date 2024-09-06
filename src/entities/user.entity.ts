import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student'
}

export enum UserGender {
  MALE = 'M',
  FEMALE = 'F'
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
    length: 100,
    unique: true
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
    enum: UserGender,
    default: UserGender.MALE
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
}
