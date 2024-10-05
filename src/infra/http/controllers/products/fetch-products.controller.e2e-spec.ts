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

describe('Fetch products (E2E)', () => {
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

  test('[GET] /products', async () => {
    const createdUser = await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'johndoe@example.com',
        password: await hash('123456', 8),
      },
    });

    const accessToken = jwt.sign({ sub: createdUser.id });

    Promise.all([
      await prisma.product.create({
        data: {
          name: 'Product 1',
          description: 'Product 1',
          price: 100.0,
        },
      }),
      await prisma.product.create({
        data: {
          name: 'Product 2',
          description: 'Product 2',
          price: 200.0,
        },
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
  });
});
