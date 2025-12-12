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
import { ViolationService } from './violation.service';
import { Violation } from './violation.entity';
import { CreateViolationDto, UpdateViolationDto } from './violation.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '../auth/user.entity';

@Controller('violations')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class ViolationController {
  constructor(private readonly violationService: ViolationService) {}

  @Post()
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.CREATED)
  async addViolation(@Body() body: CreateViolationDto): Promise<Violation> {
    return this.violationService.create(body);
  }

  @Get()
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  async getViolations(
    @Query('point', new ParseIntPipe({ optional: true })) point?: number,
    @Query('reasonId', new ParseIntPipe({ optional: true })) reasonId?: number,
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<Violation[]> {
    return this.violationService.findAll({
      point,
      reasonId,
      userId,
      fromDate,
      toDate,
    });
  }

  @Get(':violationId')
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF, UserRole.STUDENT)
  async getSpecifiedViolation(
    @Param('violationId', ParseIntPipe) violationId: number,
    @CurrentUser() user: any,
  ): Promise<Violation> {
    return this.violationService.findOne(violationId);
  }

  @Put(':violationId')
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  async updateViolation(
    @Param('violationId', ParseIntPipe) violationId: number,
    @Body() body: UpdateViolationDto,
  ): Promise<Violation> {
    return this.violationService.update(violationId, body);
  }

  @Delete(':violationId')
  @Roles(UserRole.CLASS_TEACHER, UserRole.DOMITORY_STAFF)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteViolation(
    @Param('violationId', ParseIntPipe) violationId: number,
  ): Promise<void> {
    return this.violationService.remove(violationId);
  }
}
