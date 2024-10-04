import { User } from '../../../domain/enterprise/entities/user';

export class UsersPresenter {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
