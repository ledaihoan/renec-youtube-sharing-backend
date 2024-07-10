import {
  BigIntType,
  Entity,
  PrimaryKey,
  Property,
  StringType,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../util-database';

@Entity({ tableName: 'yt_sharing.video_post' })
export class VideoPost extends BaseEntity {
  @PrimaryKey({ type: StringType })
  @ApiProperty()
  id = uuidv4();

  @Property({ type: StringType, fieldName: 'user_id' })
  @ApiProperty()
  userId: string;

  @Property({ type: StringType, fieldName: 'source_id' })
  @ApiProperty()
  sourceId: string;

  @Property({ type: StringType, fieldName: 'url' })
  @ApiProperty()
  url: string;

  @Property({
    type: StringType,
    fieldName: 'description',
    nullable: true,
    default: '',
  })
  @ApiProperty()
  description: string;

  @Property({
    type: StringType,
    fieldName: 'title',
    nullable: true,
    default: '',
  })
  @ApiProperty()
  title: string;

  @Property({
    type: BigIntType,
    fieldName: 'upvote_count',
    default: 0,
  })
  @ApiProperty()
  upvoteCount: number;

  @Property({
    type: BigIntType,
    fieldName: 'downvote_count',
    default: '',
  })
  @ApiProperty()
  downvoteCount: number;
}
