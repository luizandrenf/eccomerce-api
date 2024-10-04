import { CreateUserUseCase } from '../../../../domain/application/use-cases/users/create-user';
import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { UsersPresenter } from '../../presenters/users-presenter';
import { UserAlreadyExistsError } from '../../../../domain/application/use-cases/errors/user-already-exists-error';

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateUserDTO = z.infer<typeof createUserSchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async handle(@Body() body: CreateUserDTO) {
    try {
      const createdUser = await this.createUserUseCase.execute({
        name: body.name,
        email: body.email,
        password: body.password,
      });

      return UsersPresenter.toHttp(createdUser);
    } catch (error: any) {
      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException();
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
