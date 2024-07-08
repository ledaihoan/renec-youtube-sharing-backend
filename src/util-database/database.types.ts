import { AnyEntity, EntityName } from '@mikro-orm/core/typings';

export type DatabaseModuleOptions = {
  entities: MikroOrmEntity[];
  connectionString?: string;
};

export type MikroOrmEntity = EntityName<AnyEntity>;
