import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sexes')
export class Sex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
