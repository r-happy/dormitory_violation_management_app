import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomitoryStaff } from './domitory-staff.entity';
import { DomitoryStaffController } from './domitory-staff.controller';
import { DomitoryStaffService } from './domitory-staff.service';

@Module({
  imports: [TypeOrmModule.forFeature([DomitoryStaff])],
  controllers: [DomitoryStaffController],
  providers: [DomitoryStaffService],
  exports: [DomitoryStaffService],
})
export class DomitoryStaffModule {}
