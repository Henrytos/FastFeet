import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import { unlinkSync } from 'fs'; // Para deletar o arquivo de banco
import 'dotenv/config';
import path from 'path';

function randomDatabaseUrlForSqlite() {
  const dbName = `file:./test-${randomUUID()}.db`; // Cria um nome de arquivo único
  return dbName;
}

const prisma = new PrismaClient();

beforeEach(() => {
  const databaseUrlTest = randomDatabaseUrlForSqlite();
  process.env.DATABASE_URL = databaseUrlTest;

  execSync('npx prisma migrate deploy');
});

afterEach(async () => {
  const databaseUrlTest = process.env.DATABASE_URL;

  await prisma.$disconnect();

  const dbFilePath = databaseUrlTest?.replace('file:', '') || '';
  if (dbFilePath) {
    const pathFilename = path.resolve(__dirname, '../', 'prisma', dbFilePath);
    unlinkSync(pathFilename);
  }
});
