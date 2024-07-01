import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  room_name: string;

  @IsNumber()
  @IsNotEmpty()
  created_by: number; // User ID

  @IsDateString()
  @IsNotEmpty()
  created_at: Date;

  @IsDateString()
  updated_at: Date;
}
