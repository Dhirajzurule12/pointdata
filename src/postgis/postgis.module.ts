import { Module } from '@nestjs/common';
import { PostgisService } from './postgis.service';
import { PostgisController } from './postgis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgi } from './entities/postgi.entity';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [CsvModule,TypeOrmModule.forFeature([postgi])],
  controllers: [PostgisController],
  providers: [PostgisService],
})
export class PostgisModule {}
