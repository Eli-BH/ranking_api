import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  item_name: string;

  @IsString()
  @IsNotEmpty()
  item_image: string;

  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @IsNumber()
  @IsNotEmpty()
  ranking_id: number;

  @IsDateString()
  @IsNotEmpty()
  created_at: Date;

  @IsDateString()
  @IsNotEmpty()
  updated_at: Date;
}
