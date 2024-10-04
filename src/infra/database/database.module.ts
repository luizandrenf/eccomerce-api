import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '../../domain/application/repositories/users-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { ProductsRepository } from '../../domain/application/repositories/products-repository';
import { PrismaProductsRepository } from './prisma/repositories/prisma-products-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, ProductsRepository],
})
export class DatabaseModule {}
