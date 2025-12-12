import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reason } from './reason.entity';
import { ReasonController } from './reason.controller';
import { ReasonService } from './reason.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reason])],
  controllers: [ReasonController],
  providers: [ReasonService],
  exports: [ReasonService],
})
export class ReasonModule {}
