import { Product } from '../../enterprise/entities/product';

export abstract class ProductsRepository {
  abstract findAll(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | null>;
  abstract create(product: Product): Promise<Product>;
}
