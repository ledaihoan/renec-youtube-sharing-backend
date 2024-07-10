import * as Joi from 'joi';
import * as _ from 'lodash';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';
import { VIDEO_REACTIONS } from '../constants';

@JoiSchemaOptions({ stripUnknown: true })
export class CreateVideoPostReactionDto {
  @JoiSchema(Joi.string().trim().required())
  @ApiProperty()
  videoId: string;

  @JoiSchema(
    Joi.string()
      .valid(..._.values(VIDEO_REACTIONS))
      .required(),
  )
  @ApiProperty()
  type: string;
}
