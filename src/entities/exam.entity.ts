import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Teacher } from './teacher.entity';
import { ExamToClass } from './exam-to-class.entity';
import { Result } from './result.entity';
import { ExamToQuestion } from './exam-to-question.entity';
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

  @OneToMany(() => ExamToClass, (examToClass) => examToClass.exam)
  public examToClass: ExamToClass[];

  @ManyToOne(() => Teacher, (teacher) => teacher.exams)
  @JoinColumn({ name: 'teacherId' })
  public teacher: Teacher;

  @OneToMany(() => Result, (result) => result.exam)
  public results: Result[];

  @OneToMany(() => ExamToQuestion, (examToQuestion) => examToQuestion.exam)
  public examToQuestion: ExamToQuestion[];

  @ManyToOne(() => Category, (category) => category.exams)
  @JoinColumn({ name: 'categoryId' })
  public category: Category;
}
