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
import { Public } from '../../auth/public';
import { createZodDto } from 'nestjs-zod';
import { ApiBody } from '@nestjs/swagger';

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;
class CreateUserDTO extends createZodDto(createUserSchema) {}

@Controller('/users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @ApiBody({ type: CreateUserDTO })
  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async handle(@Body() body: CreateUserSchema) {
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
