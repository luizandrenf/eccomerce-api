import { UsersRepository } from '../../domain/application/repositories/users-repository';
import { User } from '../../domain/enterprise/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async findById(id: string): Promise<User | null> {
    return this.items.find((item) => item.id === id);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.email === email);
  }
  async create(user: User): Promise<User> {
    this.items.push(user);
    return user;
  }
  async update(user: User): Promise<User> {
    const findedIndex = this.items.findIndex((user) => user.id === user.id);
    this.items[findedIndex] = user;
    return this.items[findedIndex];
  }
  async delete(id: string): Promise<void> {
    this.items.filter((item) => item.id !== id);
  }
}
