import {
  BooleanType,
  Entity,
  PrimaryKey,
  Property,
  StringType,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../../util-database';

@Entity({ tableName: 'yt_sharing.user' })
export class User extends BaseEntity {
  @PrimaryKey({ type: StringType })
  id = uuidv4();

  @Property({ type: StringType, fieldName: 'first_name' })
  firstName: string;

  @Property({ type: StringType, fieldName: 'last_name' })
  lastName: string;

  @Property({ type: StringType, fieldName: 'email' })
  email: string;

  @Property({ type: StringType, fieldName: 'password' })
  password: string;

  @Property({ type: BooleanType, fieldName: 'is_active', default: true })
  is_active: boolean;
}
