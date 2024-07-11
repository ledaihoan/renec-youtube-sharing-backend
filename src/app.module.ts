import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { VideoPostModule } from './video-post/video-post.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT || 6379,
      },
    }),
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
