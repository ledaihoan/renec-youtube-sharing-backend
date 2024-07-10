import * as Joi from 'joi';
import * as _ from 'lodash';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import { VIDEO_SOURCES } from '../constants';

@JoiSchemaOptions({ stripUnknown: true })
export class CreateVideoPostDto {
  @JoiSchema(
    Joi.string()
      .valid(..._.values(VIDEO_SOURCES))
      .default(VIDEO_SOURCES.YOUTUBE),
  )
  @ApiProperty()
  sourceId?: string;

  @JoiSchema(Joi.string().uri({ allowRelative: false }).required())
  @ApiProperty()
  url: string;

  @JoiSchema(Joi.string().trim())
  description?: string;

  @JoiSchema(Joi.string().trim())
  title?: string;
}
