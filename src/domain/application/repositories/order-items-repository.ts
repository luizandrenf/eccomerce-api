import { OrderItem } from '@/domain/enterprise/entities/order-item';

export abstract class OrderItemsRepository {
  abstract create(item: OrderItem): Promise<OrderItem>;
  abstract findById(id: string): Promise<OrderItem | null>;
}
