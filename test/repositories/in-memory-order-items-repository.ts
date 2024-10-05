import { OrderItemsRepository } from '@/domain/application/repositories/order-items-repository';
import { OrderItem } from '@/domain/enterprise/entities/order-item';

export class InMemomryOrderItemsRepository implements OrderItemsRepository {
  public items: OrderItem[] = [];
  async create(orderItems: OrderItem) {
    this.items.push(orderItems);
    return orderItems;
  }
  async findById(id: string) {
    const orderItems = this.items.find((item) => item.id === id);

    if (!orderItems) {
      return null;
    }

    return orderItems;
  }
}
