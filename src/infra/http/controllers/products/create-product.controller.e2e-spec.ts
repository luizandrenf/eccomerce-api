import { config } from 'dotenv';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DatabaseModule } from '../../../database/database.module';
import { AppModule } from '../../../../app.module';
import { PrismaService } from '../../../database/prisma/prisma.service';
config();

describe('Create product (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /products', async () => {
    const response = await request(app.getHttpServer()).post('/products').send({
      name: 'random',
      description: 'random',
      price: 50.0,
    });

    expect(response.status).toBe(201);

    const productOnDatabase = await prisma.product.findFirst({
      where: {
        name: 'random',
      },
    });

    expect(productOnDatabase).toBeTruthy();
  });
});
