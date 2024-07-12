import { DynamicModule, Module } from '@nestjs/common';
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

@Module({})
export class VideoPostModule {
  static forRoot(): DynamicModule {
    return {
      module: VideoPostModule,
      global: true,
      imports: [
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
      ],
      controllers: [VideoPostController, VideoPostReactionController],
    };
  }
}
