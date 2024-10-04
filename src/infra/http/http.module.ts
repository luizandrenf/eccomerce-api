import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUserController } from './controllers/users/create-user.controller';
import { CreateUserUseCase } from '../../domain/application/use-cases/users/create-user';
import { AuthenticateUserController } from './controllers/users/authenticate-user.controller';
import { AuthenticateUserUseCase } from '../../domain/application/use-cases/users/authenticate-user';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CreateUserController, AuthenticateUserController],
  providers: [CreateUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
