import { Injectable } from '@nestjs/common';
import { Product } from '@/domain/enterprise/entities/product';
import { ProductsRepository } from '../../repositories/products-repository';

interface CreateProductUseCaseRequest {
  name: string;
  description: string;
  price: number;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    price,
  }: CreateProductUseCaseRequest): Promise<Product> {
    const product = Product.create({
      name,
      description,
      price,
    });

    return await this.productsRepository.create(product);
  }
}
