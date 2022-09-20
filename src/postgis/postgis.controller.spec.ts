import { Test, TestingModule } from '@nestjs/testing';
import { PostgisController } from './postgis.controller';
import { PostgisService } from './postgis.service';

describe('PostgisController', () => {
  let controller: PostgisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostgisController],
      providers: [PostgisService],
    }).compile();

    controller = module.get<PostgisController>(PostgisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
