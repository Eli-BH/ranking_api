import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // This controller will handle requests to /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Inject the UsersService

  @Post() // POST /users
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get() // GET /users
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') // GET /users/id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id') // PATCH /users/id
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/id
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
