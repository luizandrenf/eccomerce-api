import { randomUUID } from 'crypto';

interface OrderProps {
  id?: string;
  totalPrice: number;
  createdAt?: Date;
  userId: string;
}

export class Order {
  private _id: string;
  private _totalPrice: number;
  private _createdAt: Date;
  private _userId: string;

  constructor({ id, totalPrice, userId, createdAt }: OrderProps) {
    this._id = id ?? randomUUID();
    this._totalPrice = totalPrice;
    this._createdAt = createdAt ?? new Date();
    this._userId = userId;
  }

  get id(): string {
    return this._id;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get userId(): string {
    return this._userId;
  }

  static create(data: Partial<Order>): Order {
    return new Order({
      id: data.id,
      totalPrice: data.totalPrice,
      createdAt: data.createdAt,
      userId: data.userId,
    });
  }
}
