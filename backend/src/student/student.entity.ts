import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Violation } from '../violation/violation.entity';
import { Sex } from '../common/entities/sex.entity';
import { Class } from '../common/entities/class.entity';
import { Role } from '../common/entities/role.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Sex)
  @JoinColumn({ name: 'sex_id' })
  sex: Sex;

  @Column({ name: 'sex_id' })
  sexId: number;

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @Column({ name: 'class_id' })
  classId: number;

  @Column({ name: 'room_number' })
  roomNumber: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'role_id' })
  roleId: number;

  @OneToMany(() => Violation, (v) => v.student)
  violations: Violation[];
}
