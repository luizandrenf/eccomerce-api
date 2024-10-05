import { GetProductUseCase } from '../../../../domain/application/use-cases/products/get-product';
import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { ProductsPresenter } from '../../presenters/products-presenter';
import { ResourceNotFoundError } from '@/domain/application/use-cases/errors/resource-not-found-error';

@Controller('/products/:id')
export class GetProductController {
  constructor(private getProductUseCase: GetProductUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    try {
      const createdProduct = await this.getProductUseCase.execute({
        id,
      });

      return {
        product: ProductsPresenter.toHttp(createdProduct),
      };
    } catch (error: any) {
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException();
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
