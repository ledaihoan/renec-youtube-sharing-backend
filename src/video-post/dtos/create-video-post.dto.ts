import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';

@JoiSchemaOptions({ stripUnknown: true })
export class CreateVideoPostDto {
  @JoiSchema(Joi.string().uri({ allowRelative: false }).required())
  @ApiProperty()
  url: string;

  @JoiSchema(Joi.string().trim())
  description?: string;

  @JoiSchema(Joi.string().trim())
  title?: string;
}
