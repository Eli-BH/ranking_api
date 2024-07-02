import { Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,
  ) {}

  async create(createRankingDto: CreateRankingDto) {
    const ranking: Ranking = new Ranking(); // Create a new ranking
    ranking.title = createRankingDto.title; // Set the ranking name
    ranking.room_id = createRankingDto.room_id; // Set the room id
    ranking.created_at = new Date(); // current date
    ranking.updated_at = new Date(); // current date
    return this.rankingRepository.save(ranking); // Save the ranking
  }

  async findAllRoomRankings(roomId: number) {
    return await this.rankingRepository.find({
      where: {
        room_id: roomId,
      },
    });
  }

  async update(id: number, updateRankingDto: UpdateRankingDto) {
    return await this.rankingRepository
      .createQueryBuilder()
      .update(Ranking)
      .set(updateRankingDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.rankingRepository
      .createQueryBuilder()
      .delete()
      .from(Ranking)
      .where('id = :id', { id })
      .execute();
  }
}
