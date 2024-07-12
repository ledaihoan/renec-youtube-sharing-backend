import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VideoPostModule } from './video-post/video-post.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    UserModule.forRoot(),
    AuthModule.register({
      authSecret: process.env.AUTH_SECRET,
      authExpiry: process.env.AUTH_EXPIRY || '1h',
    }),
    VideoPostModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
