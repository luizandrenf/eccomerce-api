import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../../enterprise/entities/user';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { hash } from 'bcryptjs';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new UserAlreadyExistsError(email);
    }

    const hashedPassword = await hash(password, 8);

    const newUser = User.create({ name, email, password: hashedPassword });

    const createdUser = await this.usersRepository.create(newUser);

    return createdUser;
  }
}
