import { ShoppingCart } from '@/domain/enterprise/entities/shopping-cart';

export abstract class ShoppingCartRepository {
  abstract create(shoppingCart: ShoppingCart): Promise<ShoppingCart>;
}
