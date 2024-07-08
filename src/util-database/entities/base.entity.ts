import { Entity, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @Property({ type: Date, fieldName: 'created_at' })
  @ApiProperty({ type: Date })
  createdAt?: Date = new Date();

  @Property({
    type: Date,
    onUpdate: () => new Date(),
    fieldName: 'updated_at',
  })
  @ApiProperty({ type: Date })
  updatedAt?: Date = new Date();
}
