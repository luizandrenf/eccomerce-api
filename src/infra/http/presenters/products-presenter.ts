import { Product } from '../../../domain/enterprise/entities/product';

export class ProductsPresenter {
  static toHttp(product: Product) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }
}
