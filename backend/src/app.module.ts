import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Feature modules
import { StudentModule } from './student/student.module';
import { ViolationModule } from './violation/violation.module';
import { ReasonModule } from './reason/reason.module';
import { DomitoryStaffModule } from './domitory-staff/domitory-staff.module';
import { ClassTeacherModule } from './class-teacher/class-teacher.module';
import { AuthModule } from './auth/auth.module';

// Entities
import { Student } from './student/student.entity';
import { Violation } from './violation/violation.entity';
import { Reason } from './reason/reason.entity';
import { DomitoryStaff } from './domitory-staff/domitory-staff.entity';
import { ClassTeacher } from './class-teacher/class-teacher.entity';
import { User } from './auth/user.entity';
import { Sex } from './common/entities/sex.entity';
import { Class } from './common/entities/class.entity';
import { Role } from './common/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [
        Student,
        Violation,
        Reason,
        DomitoryStaff,
        ClassTeacher,
        User,
        Sex,
        Class,
        Role,
      ],
      synchronize: true,
    }),
    AuthModule,
    StudentModule,
    ViolationModule,
    ReasonModule,
    DomitoryStaffModule,
    ClassTeacherModule,
  ],
})
export class AppModule {}
