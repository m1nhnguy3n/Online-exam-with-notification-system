import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'ID'
  })
  id: string;

  @UpdateDateColumn({})
  updatedAt: Date;

  @CreateDateColumn({})
  createdAt: Date;

  @DeleteDateColumn({})
  deletedAt: Date;
}
