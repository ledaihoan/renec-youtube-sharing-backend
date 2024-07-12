import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { CreateVideoPostReactionDto, SearchVideoPostReactionDto } from './dtos';
import { Public } from '../utils/public.decorator';
import { VideoPostReactionService } from './video-post-reaction.service';
import { ClientData, UserData } from '../utils/user-data.decorator';

@Controller()
export class VideoPostReactionController {
  private logger: Logger = new Logger(VideoPostReactionController.name);

  constructor(private readonly service: VideoPostReactionService) {}

  @Post('users/:userId/reactions')
  @HttpCode(200)
  async create(
    @Param('userId') userId: string,
    @Body() dto: CreateVideoPostReactionDto,
    @ClientData() clientData: UserData,
  ) {
    this.logger.debug(
      `Creating video post reactions for user ${userId}, ${JSON.stringify(
        clientData,
      )}`,
    );
    if (clientData.id !== userId) {
      throw new ForbiddenException();
    }
    await this.service.addVideoReaction({ ...dto, userId });
  }

  @Post('users/:userId/reactions/search')
  @HttpCode(200)
  async search(
    @Param('userId') userId: string,
    @Body() dto: SearchVideoPostReactionDto,
    @ClientData() clientData: UserData,
  ) {
    if (clientData.id !== userId) {
      throw new ForbiddenException();
    }
    return this.service.searchUserReactions(userId, dto);
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
}
