import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { VIDEO_SOURCES } from '../constants';

@JoiSchemaOptions({ stripUnknown: true })
export class SearchVideoPostDto {
  @JoiSchema(
    Joi.array()
      .items(
        Joi.string()
          .valid(..._.values(VIDEO_SOURCES))
          .default(VIDEO_SOURCES.YOUTUBE),
      )
      .min(1),
  )
  @ApiProperty()
  sourceIds?: string[];

  // can open search endpoint to support search video by user id or title, description
}
