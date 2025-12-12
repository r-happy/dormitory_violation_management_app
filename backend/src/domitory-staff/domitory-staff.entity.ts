import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('domitory_staffs')
export class DomitoryStaff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
