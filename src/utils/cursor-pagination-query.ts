import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({ stripUnknown: true })
export class CursorPaginationQuery {
  @JoiSchema(Joi.number().min(1).max(1000).default(100))
  limit: number;

  @JoiSchema(Joi.string())
  cursor: string;
}
