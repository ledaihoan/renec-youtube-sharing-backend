import { Entity, Filter, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from './base.entity';

@Entity({ abstract: true })
@Filter({
  name: 'notDeleted',
  cond: { isDeleted: { $eq: false } },
  default: true,
})
export abstract class WithSoftDeleteEntity extends BaseEntity {
  @Property({
    type: Date,
    fieldName: 'deleted_at',
    hidden: true,
    nullable: true,
  })
  @ApiProperty({ type: Date })
  deletedAt?: Date;

  @Property({
    type: 'boolean',
    default: false,
    fieldName: 'is_deleted',
    hidden: true,
  })
  @ApiProperty({ type: Boolean })
  isDeleted?: boolean = false;
}
