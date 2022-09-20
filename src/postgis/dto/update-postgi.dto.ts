import { PartialType } from '@nestjs/mapped-types';
import { CreatePostgiDto } from './create-postgi.dto';

export class UpdatePostgiDto extends PartialType(CreatePostgiDto) {}
