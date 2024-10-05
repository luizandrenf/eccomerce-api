import { FetchProductsUseCase } from '../../../../domain/application/use-cases/products/fetch-products';
import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ProductsPresenter } from '../../presenters/products-presenter';

@Controller('/products')
export class FetchProductsController {
  constructor(private fetchProductsUseCase: FetchProductsUseCase) {}

  @Get()
  async handle() {
    try {
      const products = await this.fetchProductsUseCase.execute();

      return {
        products: products.map(ProductsPresenter.toHttp),
      };
    } catch (error: any) {
      throw new InternalServerErrorException();
    }
  }
}
