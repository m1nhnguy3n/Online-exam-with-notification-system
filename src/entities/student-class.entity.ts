import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Class } from './class.entity';
import { BaseEntity } from './base/base.entity';

@Entity('students_classes')
export class StudentClass extends BaseEntity {
  @Column({
    type: 'uuid'
  })
  public studentID: UUID;

  @Column({
    type: 'uuid'
  })
  public classId: UUID;

  @ManyToOne(() => Student, (student) => student.studentClass)
  public student: Student;

  @ManyToOne(() => Class, (studentClass) => studentClass.examClass)
  public class: Class;
}
