import { Entity, PrimaryKey, Property, StringType } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../util-database';

@Entity({ tableName: 'yt_sharing.video_post_reaction' })
export class VideoPostReaction extends BaseEntity {
  @PrimaryKey({ type: StringType, fieldName: 'video_id' })
  @ApiProperty()
  videoId: string;

  @PrimaryKey({ type: StringType, fieldName: 'user_id' })
  @ApiProperty()
  userId: string;

  @Property({ type: StringType, fieldName: 'type' })
  @ApiProperty()
  type: string;
}
