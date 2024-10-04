import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository';
import { AuthenticateUserUseCase } from './authenticate-user';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { hash } from 'bcryptjs';
import { User } from 'src/domain/enterprise/entities/user';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

describe('Authenticate user use case', () => {
  let usersRepository: InMemoryUsersRepository;
  let encrypter: FakeEncrypter;
  let sut: AuthenticateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    encrypter = new FakeEncrypter();
    sut = new AuthenticateUserUseCase(usersRepository, encrypter);
  });

  it('should be able to authenticate a user', async () => {
    const hashedPassword = await hash('password123', 8);

    await usersRepository.create(
      User.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: hashedPassword,
      }),
    );

    const { accessToken } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(accessToken).toBeTruthy();
  });

  it('should not be able to authenticate a user with wrong credentials', async () => {
    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
