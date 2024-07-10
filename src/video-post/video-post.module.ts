import { DynamicModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CoreDatabaseModule } from '../util-database';
import { VideoPost, VideoPostReaction } from './entities';
import {
  VideoPostReactionRepository,
  VideoPostRepository,
} from './repositories';
import { VideoPostService } from './video-post.service';
import { VideoPostController } from './video-post.controller';
import { VideoPostReactionService } from './video-post-reaction.service';
import { VideoPostReactionController } from './video-post-reaction.controller';
import { QUEUE_NAMES } from './constants';
import { VideoPostReactionHandler } from './workers/video-post-reaction.handler';

@Module({})
export class VideoPostModule {
  static forRoot(): DynamicModule {
    return {
      module: VideoPostModule,
      global: true,
      imports: [
        BullModule.registerQueue({
          name: QUEUE_NAMES.VIDEO_POST_REACTION,
          defaultJobOptions: {
            removeOnFail: false,
            removeOnComplete: true,
          },
        }),
        CoreDatabaseModule.forRoot({
          connectionString: process.env.DB_CONNECTION_STRING,
          entities: [VideoPost, VideoPostReaction],
        }),
      ],
      providers: [
        VideoPostRepository,
        VideoPostReactionRepository,
        VideoPostService,
        VideoPostReactionService,
        VideoPostReactionHandler,
      ],
      controllers: [VideoPostController, VideoPostReactionController],
    };
  }
}
