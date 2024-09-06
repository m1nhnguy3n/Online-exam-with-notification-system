import { BeforeInsert, CreateDateColumn, DeleteDateColumn, Column, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
  @Column('uuid', {
    primary: true,
    name: 'ID'
  })
  id: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
