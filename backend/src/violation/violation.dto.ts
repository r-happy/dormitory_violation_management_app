import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateViolationDto {
  @IsNumber()
  @IsNotEmpty()
  point: number;

  @IsNumber()
  @IsNotEmpty()
  reasonId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  date: string;
}

export class UpdateViolationDto {
  @IsNumber()
  @IsNotEmpty()
  point: number;

  @IsNumber()
  @IsNotEmpty()
  reasonId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  date: string;
}
