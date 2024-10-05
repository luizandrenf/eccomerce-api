import { ShoppingCartRepository } from '@/domain/application/repositories/shopping-cart-repository';
import { ShoppingCart } from '@/domain/enterprise/entities/shopping-cart';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaSHoppingCartRepository implements ShoppingCartRepository {
  constructor(private prisma: PrismaService) {}
  async create(shoppingCart: ShoppingCart): Promise<ShoppingCart> {
    const createdShoppingCart = await this.prisma.shoppingCart.create({
      data: shoppingCart,
    });
    return ShoppingCart.create(createdShoppingCart);
  }
}
