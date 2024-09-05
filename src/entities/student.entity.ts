import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany, JoinTable, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base/base.entity';
import { Class } from './class.entity';
import { Result } from './result.entity';
import { StudentToClass } from './student-to-class.entity';

@Entity('students')
export class Student extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: true,
    length: 15
  })
  public parentNumber: string;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'userID'
  })
  public user: User;

  @OneToMany(() => Result, (result) => result.student)
  public results: Result[];

  @OneToMany(() => StudentToClass, (studentToClass) => studentToClass.class)
  public studentToClass: StudentToClass[];
}
