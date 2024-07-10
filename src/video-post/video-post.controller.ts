import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { VideoPostService } from './video-post.service';
import { CreateVideoPostDto } from './dtos';
import { Public } from '../utils/public.decorator';
import { SearchVideoPostDto } from './dtos/search-video-post.dto';

@Controller('video-posts')
export class VideoPostController {
  constructor(private readonly service: VideoPostService) {}

  @Post()
  async create(@Body() dto: CreateVideoPostDto) {
    return this.service.createVideoPost(dto);
  }

  @Public()
  @Post('search')
  @HttpCode(200)
  async search(@Body() dto: SearchVideoPostDto) {
    return this.service.searchVideoPosts(dto);
  }
}
