import { DynamicModule, Module } from '@nestjs/common';

import { User } from './entities';
import { UserRepository } from './repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CoreDatabaseModule } from '../util-database';

@Module({})
export class UserModule {
  static forRoot(): DynamicModule {
    return {
      module: UserModule,
      global: true,
      imports: [
        CoreDatabaseModule.forRoot({
          connectionString: process.env.DB_CONNECTION_STRING,
          entities: [User],
        }),
      ],
      providers: [UserRepository, UserService],
      controllers: [UserController],
      exports: [UserRepository, UserService],
    };
  }
}
