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
import { createZodDto } from 'nestjs-zod';
import { ApiBody } from '@nestjs/swagger';

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;
class CreateProductDTO extends createZodDto(createProductSchema) {}

@Controller('/products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @ApiBody({ type: CreateProductDTO })
  @Public()
  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async handle(@Body() { name, description, price }: CreateProductSchema) {
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
