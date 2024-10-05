import { Order } from '@/domain/enterprise/entities/order';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrdersRepository } from '@/domain/application/repositories/orders-repository';

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}
  async create(order: Order): Promise<Order> {
    const orderItem = await this.prisma.order.create({
      data: order,
    });

    return Order.create(orderItem);
  }
  async findById(id: string): Promise<Order | null> {
    const orderItem = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!orderItem) {
      return null;
    }

    return Order.create(orderItem);
  }
}
