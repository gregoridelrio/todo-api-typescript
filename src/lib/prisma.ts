import "dotenv/config";
import { PrismaClient } from "../generated/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  database: process.env.DATABASE_NAME!,
});

const prisma = new PrismaClient({ adapter });

export default prisma;