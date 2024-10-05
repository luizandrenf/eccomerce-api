import { OrdersRepository } from '@/domain/application/repositories/orders-repository';
import { Order } from '@/domain/enterprise/entities/order';

export class InMemomryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];
  async create(order: Order) {
    this.items.push(order);
    return order;
  }
  async findById(id: string) {
    const order = this.items.find((item) => item.id === id);

    if (!order) {
      return null;
    }

    return order;
  }
}
