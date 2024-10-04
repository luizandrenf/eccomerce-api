import { Product } from 'src/domain/enterprise/entities/product';
import { ProductsRepository } from '../../src/domain/application/repositories/products-repository';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = [];
  async findAll(): Promise<Product[]> {
    return this.items;
  }
  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id === id);

    if (!product) {
      return null;
    }

    return product;
  }
  async create(product: Product): Promise<Product> {
    this.items.push(product);
    return product;
  }
}
