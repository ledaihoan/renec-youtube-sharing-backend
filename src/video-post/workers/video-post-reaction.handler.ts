import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EntityData } from '@mikro-orm/core';
import {
  VIDEO_POST_REACTION_EVENT_TYPES,
  VideoPostReactionEvent,
} from '../types/video-post-reaction-event';
import { VideoPostRepository } from '../repositories';
import { QUEUE_NAMES, VIDEO_REACTIONS } from '../constants';
import { VideoPost } from '../entities';

@Processor(QUEUE_NAMES.VIDEO_POST_REACTION, { concurrency: 1 })
export class VideoPostReactionHandler extends WorkerHost {
  constructor(private videoPostRepository: VideoPostRepository) {
    super();
  }

  async process(job: Job<VideoPostReactionEvent, void, string>): Promise<any> {
    const { data } = job;
    const videoPost = await this.videoPostRepository.findOne({
      id: data.videoId,
    });
    const isUpVote = data.type === VIDEO_REACTIONS.UPVOTE;
    let changeAmount = 0;
    switch (job.name) {
      case VIDEO_POST_REACTION_EVENT_TYPES.INCREASE:
        changeAmount = 1;
        break;
      case VIDEO_POST_REACTION_EVENT_TYPES.DECREASE:
        changeAmount = -1;
        break;
      default:
        break;
    }
    const updateData: EntityData<VideoPost> = isUpVote
      ? { upvoteCount: changeAmount + videoPost.upvoteCount }
      : { downVoteCount: changeAmount + videoPost.downVoteCount };
    if (changeAmount !== 0) {
      await this.videoPostRepository.update(videoPost, updateData);
    }
  }
}
