import {
  BooleanType,
  Entity,
  PrimaryKey,
  Property,
  StringType,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../util-database';

@Entity({ tableName: 'yt_sharing.user' })
export class User extends BaseEntity {
  @PrimaryKey({ type: StringType })
  @ApiProperty()
  id = uuidv4();

  @Property({ type: StringType, fieldName: 'email' })
  @ApiProperty()
  email: string;

  @Property({ type: StringType, fieldName: 'password' })
  @ApiProperty()
  password: string;

  @Property({ type: BooleanType, fieldName: 'is_active', default: true })
  @ApiProperty()
  is_active: boolean;
}
