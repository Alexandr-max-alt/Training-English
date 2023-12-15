import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Words } from './models/words.model';

@Module({
  imports: [SequelizeModule.forFeature([Words])],
  controllers: [WordsController],
  providers: [WordsService]
})
export class WordsModule {}
