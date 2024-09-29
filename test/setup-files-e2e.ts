import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import 'dotenv/config';

function randomDatabaseUrlBySchema(databaseUrl: string, schema: string) {
  const url = new URL(databaseUrl);
  url.searchParams.set('schema', schema);
  return url.toString();
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('No DATABASE_URL environment variable found');
}

const prisma = new PrismaClient();
const schema = randomUUID();

beforeEach(() => {
  const databaseUrlTest = randomDatabaseUrlBySchema(databaseUrl, schema);
  process.env.DATABASE_URL = databaseUrlTest;
  execSync('npx prisma migrate deploy');
  console.log(process.env.DATABASE_URL);
});

afterEach(async () => {
  const url = new URL(process.env.DATABASE_URL);
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await prisma.$disconnect();
  console.log(process.env.DATABASE_URL);
});
