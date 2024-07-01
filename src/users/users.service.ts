import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User(); // Create a new user
    user.username = createUserDto.username; // Set the username
    return this.userRepository.save(user); // Save the user
  }

  async findAll() {
    return this.userRepository.find(); // Find all users
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.findOneBy({
      id,
    });
  }

  /*
   * This is the most efficient way in terms of performance to update entities in your database.
   * From: https://typeorm.io/update-query-builder
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();
  }

  /*
   * This is the most efficient way in terms of performance to delete entities from your database.
   * From: https://typeorm.io/delete-query-builder
   */
  async remove(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
