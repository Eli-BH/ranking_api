import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item: Item = new Item(); // Create a new item
    item.item_name = createItemDto.item_name; // Set the item name
    item.created_at = new Date(); // current date
    item.updated_at = new Date(); // current date
    item.item_image = createItemDto.item_image; // Set the item image
    item.room_id = createItemDto.room_id; // Set the room id
    item.ranking_id = createItemDto.ranking_id; // Set the ranking id
    return this.itemRepository.save(item); // Save the item
  }

  async findAllRoomItems(roomId: number) {
    return await this.itemRepository.find({
      where: {
        room_id: roomId,
      },
    });
  }

  async updateRanking(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({
      id,
    });
    if (!item) {
      return `Item #${id} not found`;
    }

    item.updated_at = new Date(); // current date

    await this.itemRepository.save(item); // Save the item

    await this.itemRepository
      .createQueryBuilder()
      .update(Item)
      .set(updateItemDto)
      .where('id = :id', { id })
      .execute();

    return item; // Return the item
  }

  async remove(id: number) {
    return await this.itemRepository
      .createQueryBuilder()
      .delete()
      .from(Item)
      .where('id = :id', { id })
      .execute();
  }
}
