import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { Encrypter } from '../../cryptography/encrypter';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { compare } from 'bcryptjs';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt(user.id);

    return {
      accessToken,
    };
  }
}
