import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { JwtEncrypter } from './jwt-encrypter';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Encrypter } from '../../../domain/application/cryptography/encrypter';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    JwtStrategy,
  ],
  exports: [Encrypter],
})
export class AuthModule {}
