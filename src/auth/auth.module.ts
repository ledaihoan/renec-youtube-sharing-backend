import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AUTH_MODULE_OPTION, AuthModuleOption } from './auth-module-option';

@Module({})
export class AuthModule {
  static register(option: AuthModuleOption): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        UserModule,
        JwtModule.register({
          global: true,
          secret: option.authSecret,
          signOptions: { expiresIn: option.authExpiry },
        }),
      ],
      controllers: [AuthController],
      providers: [
        { provide: AUTH_MODULE_OPTION, useValue: option },
        AuthService,
      ],
      exports: [AuthService, AUTH_MODULE_OPTION],
    };
  }
}
