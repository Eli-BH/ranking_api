import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room: Room = new Room(); // Create a new room

    room.room_name = createRoomDto.room_name; // Set the room name
    room.created_by = createRoomDto.created_by; // user id
    room.created_at = new Date(); // current date
    room.updated_at = new Date(); // current date
    return this.roomRepository.save(room); // Save the room
  }

  async findAll() {
    return this.roomRepository.find(); // Find all rooms
  }

  async findAllByUser(userId: number) {
    return this.roomRepository.findBy({
      created_by: userId,
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  async findOneByTitle(title: string) {
    return this.roomRepository.findOneBy({
      room_name: title,
    });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.findOneBy({
      id,
    });
    if (!room) {
      throw new NotFoundException(`Room #${id} not found`);
    }
    room.updated_at = new Date(); // current date
    await this.roomRepository.save(room); // Save the room

    return this.roomRepository
      .createQueryBuilder()
      .update(Room)
      .set(updateRoomDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    const room = await this.roomRepository.findOneBy({
      id,
    });
    if (!room) {
      throw new NotFoundException(`Room #${id} not found`);
    }

    return this.roomRepository
      .createQueryBuilder()
      .delete()
      .from(Room)
      .where('id = :id', { id })
      .execute();
  }
}
