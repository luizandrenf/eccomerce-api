import { OrderStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

interface OrderProps {
  id?: string;
  totalPrice: number;
  status?: OrderStatus;
  createdAt?: Date;
  userId: string;
}

export class Order {
  private _id: string;
  private _totalPrice: number;
  private _status: OrderStatus;
  private _createdAt: Date;
  private _userId: string;

  constructor({ id, totalPrice, userId, createdAt, status }: OrderProps) {
    this._id = id ?? randomUUID();
    this._totalPrice = totalPrice;
    this._status = status ?? OrderStatus.PENDING;
    this._createdAt = createdAt ?? new Date();
    this._userId = userId;
  }

  get id(): string {
    return this._id;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  get status(): OrderStatus {
    return this._status;
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
      status: data.status,
      createdAt: data.createdAt,
      userId: data.userId,
    });
  }
}
