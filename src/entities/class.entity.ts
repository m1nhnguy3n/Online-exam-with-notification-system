import { Column, ManyToMany, Entity, OneToMany, Index } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { StudentClass } from './student-class.entity';
import { ExamClass } from './exam-class.entity';

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
  public timeStart: Date;

  @Column({
    type: 'date',
    nullable: false
  })
  public timeEnd: Date;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.class)
  public studentClass: StudentClass[];

  @OneToMany(() => ExamClass, (examClass) => examClass.class)
  public examClass: ExamClass[];
}
