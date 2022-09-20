import { Test, TestingModule } from '@nestjs/testing';
import { PostgisService } from './postgis.service';

describe('PostgisService', () => {
  let service: PostgisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgisService],
    }).compile();

    service = module.get<PostgisService>(PostgisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
