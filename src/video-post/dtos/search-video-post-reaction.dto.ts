import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { VIDEO_REACTIONS } from '../constants';

@JoiSchemaOptions({ stripUnknown: true })
export class SearchVideoPostReactionDto {
  @JoiSchema(Joi.array().items(Joi.string().trim()).min(1))
  @ApiProperty()
  videoIds?: string[];

  @JoiSchema(
    Joi.array()
      .items(Joi.string().valid(..._.values(VIDEO_REACTIONS)))
      .min(1),
  )
  @ApiProperty()
  types: string[];
}
