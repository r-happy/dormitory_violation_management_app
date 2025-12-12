import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  STUDENT = 'Student',
  CLASS_TEACHER = 'ClassTeacher',
  DOMITORY_STAFF = 'DomitoryStaff',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ nullable: true })
  relatedId: number;
}
