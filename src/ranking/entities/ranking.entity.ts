import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Item } from 'src/item/entities/item.entity';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  room_name: string; // Room name

  @ManyToOne(() => Room, (room) => room.id) // Many rankings can be created by one room
  room_id: number; // Room id

  @Column({ type: 'timestamp' })
  created_at: Date; // Date created

  @Column({ type: 'timestamp' })
  updated_at: Date; // Date updated

  @OneToMany(() => Item, (item) => item.id) // One ranking can have many items
  item_id: number; // Item id
}
