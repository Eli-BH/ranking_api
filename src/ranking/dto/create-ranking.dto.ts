import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateRankingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  room_id: number; // Room ID

  @IsDateString()
  @IsNotEmpty()
  created_at: Date; // Date of creation

  @IsDateString()
  @IsNotEmpty()
  updated_at: Date; // Date of last update

  @IsNumber()
  ranking_level: number; // Level betwee 1 - n
}
