import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';

@JoiSchemaOptions({ stripUnknown: true })
export class CreateUserDto {
  @ApiProperty()
  @JoiSchema(Joi.string().trim().required())
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().required())
  password: string;
}
