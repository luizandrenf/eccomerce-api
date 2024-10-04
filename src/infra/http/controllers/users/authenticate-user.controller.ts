import { AuthenticateUserUseCase } from '../../../../domain/application/use-cases/users/authenticate-user';
import {
  Body,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { Public } from '../../auth/public';
import { InvalidCredentialsError } from '../../../../domain/application/use-cases/errors/invalid-credentials-error';

const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthenticateUserDTO = z.infer<typeof authenticateUserSchema>;

@Controller('/auth')
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(authenticateUserSchema))
  async handle(@Body() { email, password }: AuthenticateUserDTO) {
    try {
      const { accessToken } = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return {
        access_token: accessToken,
      };
    } catch (error: any) {
      switch (error.constructor) {
        case InvalidCredentialsError:
          throw new ForbiddenException();
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
