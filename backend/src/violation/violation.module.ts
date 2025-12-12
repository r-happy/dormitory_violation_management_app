import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Violation } from './violation.entity';
import { ViolationController } from './violation.controller';
import { ViolationService } from './violation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Violation])],
  controllers: [ViolationController],
  providers: [ViolationService],
  exports: [ViolationService],
})
export class ViolationModule {}
