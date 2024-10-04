import { CreateProductUseCase } from '../../../../domain/application/use-cases/products/create-product';
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { Public } from '../../auth/public';
import { ProductsPresenter } from '../../presenters/products-presenter';

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

type CreateProductDTO = z.infer<typeof createProductSchema>;

@Controller('/products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async handle(@Body() { name, description, price }: CreateProductDTO) {
    try {
      const createdProduct = await this.createProductUseCase.execute({
        name,
        description,
        price,
      });

      return ProductsPresenter.toHttp(createdProduct);
    } catch (error: any) {
      throw new InternalServerErrorException();
    }
  }
}
