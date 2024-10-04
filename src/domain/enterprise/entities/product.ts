import { randomUUID } from 'crypto';

interface ProductProps {
  id?: string;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
}

export class Product {
  private _id: string;
  private _name: string;
  private _description: string;
  private _price: number;
  private _createdAt: Date;

  constructor({ id, name, description, price, createdAt }: ProductProps) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._description = description;
    this._price = price;
    this._createdAt = createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  static create(data: Partial<Product>): Product {
    return new Product({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      createdAt: data.createdAt,
    });
  }
}
