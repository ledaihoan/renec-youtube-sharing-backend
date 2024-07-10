import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CreateVideoPostReactionDto } from './dtos';
import { Public } from '../utils/public.decorator';
import { VideoPostReactionService } from './video-post-reaction.service';
import { SearchVideoPostReactionDto } from './dtos/search-video-post-reaction.dto';
import { ClientData, UserData } from '../utils/user-data.decorator';

@Controller()
export class VideoPostReactionController {
  constructor(private readonly service: VideoPostReactionService) {}

  @Post('users/:userId/reactions')
  @HttpCode(200)
  async create(@Body() dto: CreateVideoPostReactionDto) {
    await this.service.addVideoReaction(dto);
  }

  @Delete('users/:userId/reactions/:videoId')
  async delete(
    @Param('userId') userId: string,
    @Param('videoId') videoId: string,
    @ClientData() clientData: UserData,
  ) {
    if (clientData.id !== userId) {
      throw new ForbiddenException();
    }
    return this.service.removeVideoReaction(userId, videoId);
  }

  @Public()
  @Post('video-post-reactions/search')
  @HttpCode(200)
  async search(@Body() dto: SearchVideoPostReactionDto) {
    return this.service.searchVideoPostReactions(dto);
  }
}
