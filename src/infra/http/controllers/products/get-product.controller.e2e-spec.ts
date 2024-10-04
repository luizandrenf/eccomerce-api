import { config } from 'dotenv';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DatabaseModule } from '../../../database/database.module';
import { AppModule } from '../../../../app.module';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
config();

describe('Get product (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /products/:id', async () => {
    const createdUser = await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      },
    });

    const accessToken = jwt.sign({ sub: createdUser.id });

    const createdProduct = await prisma.product.create({
      data: {
        name: 'random',
        description: 'random',
        price: 50.0,
      },
    });

    const { id } = createdProduct;

    const response = await request(app.getHttpServer())
      .get(`/products/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'random',
        description: 'random',
        price: 50.0,
      });

    expect(response.status).toBe(200);
  });
});
