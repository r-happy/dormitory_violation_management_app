import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reasons')
export class Reason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  point: number;
}
