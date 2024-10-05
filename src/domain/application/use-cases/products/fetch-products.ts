import { Injectable } from '@nestjs/common';
import { Product } from '@/domain/enterprise/entities/product';
import { ProductsRepository } from '../../repositories/products-repository';

@Injectable()
export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}
