import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateReasonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  point: number;
}

export class UpdateReasonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  point: number;
}
