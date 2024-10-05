import { OrderItemsRepository } from '@/domain/application/repositories/order-items-repository';
import { OrderItem } from '@/domain/enterprise/entities/order-item';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderItemsRepository implements OrderItemsRepository {
  constructor(private prisma: PrismaService) {}
  async create(item: OrderItem): Promise<OrderItem> {
    const orderItem = await this.prisma.orderItem.create({
      data: item,
    });
    return OrderItem.create(orderItem);
  }
  async findById(id: string): Promise<OrderItem | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });

    if (!orderItem) {
      return null;
    }

    return OrderItem.create(orderItem);
  }
}
