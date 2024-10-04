import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../../../domain/application/repositories/products-repository';
import { PrismaService } from '../prisma.service';
import { Product } from '@/domain/enterprise/entities/product';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prismaService: PrismaService) {}
  async findAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany();

    // Map the Prisma products to Product entities before returning them
    return products.map(Product.create);
  }
  async findById(id: string): Promise<Product | null> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return Product.create(product);
  }
  async create(product: Product): Promise<Product> {
    const createdProduct = await this.prismaService.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
      },
    });

    return Product.create(createdProduct);
  }
}
