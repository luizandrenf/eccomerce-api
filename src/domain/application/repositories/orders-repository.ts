import { Order } from '@/domain/enterprise/entities/order';

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<Order>;
  abstract findById(id: string): Promise<Order | null>;
}
