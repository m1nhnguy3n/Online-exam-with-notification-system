import { UUID } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exam } from './exam.entity';
import { Class } from './class.entity';
import { BaseEntity } from './base/base.entity';

@Entity('exams_classes')
export class ExamToClass extends BaseEntity {
  @Column({
    type: 'uuid'
  })
  public examId: string;

  @Column({
    type: 'uuid'
  })
  public classId: string;

  @ManyToOne(() => Exam, (exam) => exam.examToClass)
  public exam: Exam;

  @ManyToOne(() => Class, (studentClass) => studentClass.examToClass)
  public class: Class;

  @Column({
    type: 'date',
    nullable: false
  })
  public timeStart: Date;

  @Column({
    type: 'date',
    nullable: false
  })
  public timeEnd: Date;
}
