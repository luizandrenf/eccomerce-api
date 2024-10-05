import { randomUUID } from 'crypto';

interface OrderItemProps {
  id?: string;
  quantity: number;
  price: number;
  productId: string;
  orderId: string;
  shoppingCartId: string;
}

export class OrderItem {
  private _id: string;
  private _quantity: number;
  private _price: number;
  private _productId: string;
  private _orderId: string;
  private _shoppingCartId: string;

  constructor({
    id,
    quantity,
    price,
    productId,
    orderId,
    shoppingCartId,
  }: OrderItemProps) {
    this._id = id ?? randomUUID();
    this._quantity = quantity;
    this._price = price;
    this._productId = productId;
    this._orderId = orderId;
    this._shoppingCartId = shoppingCartId;
  }

  get id(): string {
    return this._id;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get productId(): string {
    return this._productId;
  }

  get orderId(): string {
    return this._orderId;
  }

  get shoppingCartId(): string {
    return this._orderId;
  }

  static create(data: Partial<OrderItem>): OrderItem {
    return new OrderItem({
      id: data.id,
      quantity: data.quantity,
      price: data.price,
      productId: data.productId,
      orderId: data.orderId,
      shoppingCartId: data.shoppingCartId,
    });
  }
}
