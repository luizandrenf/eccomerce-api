import { config } from 'dotenv';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DatabaseModule } from '../../../database/database.module';
import { AppModule } from '../../../../app.module';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { execSync } from 'child_process';
import { generateUniqueDatabaseURL } from '../../../../test/setup-e2e';
config();

describe('Create user (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const schemaId = randomUUID();
  const databaseUrl = generateUniqueDatabaseURL(schemaId);

  beforeAll(async () => {
    execSync('npx prisma migrate deploy', {
      env: { ...process.env, DATABASE_URL: databaseUrl },
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();

    prisma = moduleFixture.get(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
    );
    await prisma.$disconnect();
    await app.close();
  });

  test('[POST] /users', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'John Doe',
      email: 'johndoe234@example.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
  });
});
