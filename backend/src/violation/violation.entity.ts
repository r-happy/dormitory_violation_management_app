import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from '../student/student.entity';
import { Reason } from '../reason/reason.entity';

@Entity('violations')
export class Violation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  point: number;

  @ManyToOne(() => Reason)
  @JoinColumn({ name: 'reason_id' })
  reason: Reason;

  @Column({ name: 'reason_id' })
  reasonId: number;

  @ManyToOne(() => Student, (student) => student.violations)
  @JoinColumn({ name: 'user_id' })
  student: Student;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'date' })
  date: string;
}
