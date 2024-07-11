import { JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({ stripUnknown: true })
export class SearchVideoPostDto {
  // can open search endpoint to support search video by user id or title, description
}
