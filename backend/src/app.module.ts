import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { User } from './user.entity';
import { Session } from './session.entity';
import { Movie } from './movie.entity';
import { Seeder } from './seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Session, Movie],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Session, Movie]),
  ],
  controllers: [AppController],
  providers: [AppService, Seeder],
})
export class AppModule {}
