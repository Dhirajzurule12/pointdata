import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreatePostgiDto } from './dto/create-postgi.dto';
import { UpdatePostgiDto } from './dto/update-postgi.dto';
import { postgi } from './entities/postgi.entity';

@Injectable()
export class PostgisService {
  // create(createPostgiDto: CreatePostgiDto) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(
    @InjectRepository(postgi)
    private readonly PostgiRepository: Repository<postgi>,
  ) {}

  async saveFile(file: any): Promise<string[]> {
    const csv = require('csvtojson');
    const csvFilePath = process.cwd() + '/' + file.path;

    const postArray = await csv().fromFile(csvFilePath);
    var posts;

    try {
      posts = await this.PostgiRepository.save(postArray);
    } catch (error) {
      posts = null;
    }
    return posts;
  }

  create(createPostgiDto: CreatePostgiDto) {
    return this.PostgiRepository.save(createPostgiDto);
  }

  findAll() {
    return this.PostgiRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} postgi`;
  // }

  // update(id: number, updatePostgiDto: UpdatePostgiDto) {
  //   return `This action updates a #${id} postgi`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} postgi`;
  // }
}
