import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Ranking } from 'src/ranking/entities/ranking.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  item_name: string;

  @Column({ type: 'varchar', length: 255 })
  item_image: string;

  @ManyToOne(() => Room, (room) => room.id) // Many items can be created by one room
  room_id: number; // Room id

  @OneToOne(() => Ranking, (ranking) => ranking.id) // One item can have one ranking
  ranking_id: number; // Ranking id

  @Column({ type: 'timestamp' })
  created_at: Date; // Date created

  @Column({ type: 'timestamp' })
  updated_at: Date; // Date updated
}
