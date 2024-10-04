import { Injectable } from '@nestjs/common';
import { Product } from '@/domain/enterprise/entities/product';
import { ProductsRepository } from '../../repositories/products-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetProductUseCaseRequest {
  id: string;
}

@Injectable()
export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: GetProductUseCaseRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError('product');
    }

    return product;
  }
}
