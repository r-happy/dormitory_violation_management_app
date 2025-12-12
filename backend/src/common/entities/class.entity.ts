import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
