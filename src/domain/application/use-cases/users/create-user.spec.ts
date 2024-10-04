import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository';
import { CreateUserUseCase } from './create-user';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

describe('Create user use case', () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('shoul be able to create a user', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(user).toBeTruthy();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@example.com');
  });

  it('should not be able to create a user with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
