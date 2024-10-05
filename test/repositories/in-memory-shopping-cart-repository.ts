import { ShoppingCartRepository } from '@/domain/application/repositories/shopping-cart-repository';
import { ShoppingCart } from '@/domain/enterprise/entities/shopping-cart';

export class InMemoryShoppingCartRepository implements ShoppingCartRepository {
  public items: ShoppingCart[] = [];
  async create(shoppingCart: ShoppingCart) {
    this.items.push(shoppingCart);
    return shoppingCart;
  }
}
