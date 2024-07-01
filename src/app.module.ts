import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { RankingModule } from './ranking/ranking.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // needed for use of .env vars *https://docs.nestjs.com/techniques/configuration*
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: 5432,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD as string,
      database: process.env.PGDATABASE,
      entities: [__dirname + 'dist/**/*.entity{.ts,.js}'], // *https://docs.nestjs.com/recipes/sql-typeorm*
      synchronize: true, // set to false in production *https://docs.nestjs.com/techniques/database*
      ssl: true,
    }),
    UsersModule,
    RoomsModule,
    RankingModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
