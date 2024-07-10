import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { ApiProperty } from '@nestjs/swagger';

@JoiSchemaOptions({ stripUnknown: true })
export class RegisterUserDto {
  @JoiSchema(Joi.string().trim().required())
  @ApiProperty()
  email: string;

  @JoiSchema(Joi.string().trim().required())
  @ApiProperty()
  password: string;
}
