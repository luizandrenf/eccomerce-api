import { config } from 'dotenv';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DatabaseModule } from '../../../database/database.module';
import { AppModule } from '../../../../app.module';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { hash } from 'bcryptjs';
import { AuthModule } from '../../auth/auth.module';
config();

describe('Authenticate user (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, AuthModule],
      providers: [PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /auth', async () => {
    const hashedPassword = await hash('123456', 8);

    await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'johndoe@example.com',
        password: hashedPassword,
      },
    });

    const response = await request(app.getHttpServer()).post('/auth').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body.access_token).toBeTruthy();
  });
});
