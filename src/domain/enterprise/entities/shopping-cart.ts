import { randomUUID } from 'crypto';

interface ShoppingCartProps {
  id?: string;
  userId: string;
}

export class ShoppingCart {
  private _id: string;
  private _userId: string;

  constructor({ id, userId }: ShoppingCartProps) {
    this._id = id ?? randomUUID();
    this._userId = userId;
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  static create(data: Partial<ShoppingCart>): ShoppingCart {
    return new ShoppingCart({
      id: data.id,
      userId: data.userId,
    });
  }
}
