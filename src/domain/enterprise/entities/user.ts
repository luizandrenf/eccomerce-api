import { randomUUID } from 'crypto';
import { UserRole } from '@prisma/client';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  role?: UserRole;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _role: UserRole;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({
    id,
    name,
    email,
    role,
    password,
    createdAt,
    updatedAt,
  }: UserProps) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._email = email;
    this._role = role ?? UserRole.USER;
    this._password = password;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get role(): UserRole {
    return this._role;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(data: Partial<User>): User {
    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
