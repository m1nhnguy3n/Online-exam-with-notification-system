import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Student } from './student.entity';
import { Exam } from './exam.entity';
import { HistoryAnswer } from './history-answer.entity';

@Entity('results')
export class Result extends BaseEntity {
  @Column({
    type: 'decimal',
    nullable: false,
    default: 0
  })
  public score: number;

  @Column({
    type: 'date',
    nullable: false
  })
  public timeStart: Date;

  @Column({
    type: 'interval',
    nullable: false
  })
  public timeTaken: number;

  @OneToMany(() => HistoryAnswer, (historyAnswer) => historyAnswer.result)
  public historyAnswers: HistoryAnswer[];

  @ManyToOne(() => Student, (student) => student.results)
  @JoinColumn({ name: 'studentId' })
  public student: Student;

  @ManyToOne(() => Exam, (exam) => exam.results)
  @JoinColumn({ name: 'examId' })
  public exam: Exam;
}
