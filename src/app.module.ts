import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { VideoPostModule } from './video-post/video-post.module';

@Module({
  imports: [
    UserModule.forRoot(),
    AuthModule.register({
      authSecret: process.env.AUTH_SECRET,
      authExpiry: process.env.AUTH_EXPIRY || '1h',
    }),
    VideoPostModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
