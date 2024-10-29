import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "crypto";
import { config } from "dotenv";

config({ path: ".env", override: true });

const prisma = new PrismaClient();

const schema = randomUUID();

function generateUniqueDatabaseURL() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Database url not specified");
  }

  const databaseUrl = new URL(process.env.DATABASE_URL);

  databaseUrl.searchParams.set("schema", schema);

  return databaseUrl.toString();
}

beforeEach(async () => {
  const databaseUrl = generateUniqueDatabaseURL();

  process.env.DATABASE_URL = databaseUrl;
  execSync("npx prisma migrate deploy");
});

afterEach(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await prisma.$disconnect();
});
