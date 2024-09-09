import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Teacher } from './teacher.entity';
import { ExamClass } from './exam-class.entity';
import { Result } from './result.entity';
import { ExamQuestion } from './exam-question.entity';
import { Category } from './category.entity';

@Entity('exams')
export class Exam extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
    unique: true
  })
  public name: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  public description: string;

  @Column({
    type: 'interval',
    nullable: false
  })
  public duration: string;

  @Column({
    type: 'boolean',
    default: false
  })
  public isPublic: boolean;

  @OneToMany(() => ExamClass, (examClass) => examClass.exam)
  public examClass: ExamClass[];

  @ManyToOne(() => Teacher, (teacher) => teacher.exams)
  public teacher: Teacher;

  @OneToMany(() => Result, (result) => result.exam)
  public results: Result[];

  @OneToMany(() => ExamQuestion, (examQuestion) => examQuestion.exam)
  public examQuestion: ExamQuestion[];

  @ManyToOne(() => Category, (category) => category.exams)
  public category: Category;
}
