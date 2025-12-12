import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ReasonService } from './reason.service';
import { Reason } from './reason.entity';
import { CreateReasonDto, UpdateReasonDto } from './reason.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../auth/user.entity';

@Controller('reasons')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class ReasonController {
  constructor(private readonly reasonService: ReasonService) {}

  @Post()
  @Roles(UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.CREATED)
  async addReason(@Body() body: CreateReasonDto): Promise<Reason> {
    return this.reasonService.create(body);
  }

  @Get()
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF, UserRole.STUDENT)
  async getReasons(
    @Query('name') name?: string,
    @Query('point', new ParseIntPipe({ optional: true })) point?: number,
  ): Promise<Reason[]> {
    return this.reasonService.findAll({ name, point });
  }

  @Get(':reasonId')
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF, UserRole.STUDENT)
  async getSpecifiedReason(
    @Param('reasonId', ParseIntPipe) reasonId: number,
  ): Promise<Reason> {
    return this.reasonService.findOne(reasonId);
  }

  @Put(':reasonId')
  @Roles(UserRole.DOMITORY_STAFF)
  async updateReason(
    @Param('reasonId', ParseIntPipe) reasonId: number,
    @Body() body: UpdateReasonDto,
  ): Promise<Reason> {
    return this.reasonService.update(reasonId, body);
  }

  @Delete(':reasonId')
  @Roles(UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReason(
    @Param('reasonId', ParseIntPipe) reasonId: number,
  ): Promise<void> {
    return this.reasonService.remove(reasonId);
  }
}
