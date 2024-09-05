import { Column, ManyToMany, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { StudentToClass } from './student-to-class.entity';
import { ExamToClass } from './exam-to-class.entity';

@Entity('classes')
export class Class extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  public name: string;

  @Column({
    type: 'date',
    nullable: false
  })
  public classStart: Date;

  @Column({
    type: 'date',
    nullable: false
  })
  public classEnd: Date;

  @OneToMany(() => StudentToClass, (studentToClass) => studentToClass.class)
  public studentToClass: StudentToClass[];


  @OneToMany(() => ExamToClass, (examToClass) => examToClass.class)
  public examToClass: ExamToClass[];
}
