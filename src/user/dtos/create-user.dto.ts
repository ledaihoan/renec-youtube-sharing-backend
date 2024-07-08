import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({ stripUnknown: true })
export class CreateUserDto {
  @JoiSchema(Joi.string().trim().required())
  email: string;

  @JoiSchema(Joi.string().trim().required())
  password: string;
}
