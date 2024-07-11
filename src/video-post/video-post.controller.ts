import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { getClassSchema, JoiPipe } from 'nestjs-joi';
import { VideoPostService } from './video-post.service';
import { CreateVideoPostDto } from './dtos';
import { Public } from '../utils/public.decorator';
import { SearchVideoPostDto } from './dtos/search-video-post.dto';
import { CursorPaginationQuery } from '../utils/cursor-pagination-query';
import { ClientData, UserData } from '../utils/user-data.decorator';

@Controller('video-posts')
export class VideoPostController {
  constructor(private readonly service: VideoPostService) {}

  @Post()
  async create(
    @Body() dto: CreateVideoPostDto,
    @ClientData() clientData: UserData,
  ) {
    return this.service.createVideoPost({ ...dto, userId: clientData.id });
  }

  @Public()
  @Post('search')
  @HttpCode(200)
  async search(
    @Query(new JoiPipe(getClassSchema(CursorPaginationQuery)))
    query: CursorPaginationQuery,
    @Body() dto: SearchVideoPostDto,
  ) {
    return this.service.searchVideoPosts(dto, query);
  }
}
