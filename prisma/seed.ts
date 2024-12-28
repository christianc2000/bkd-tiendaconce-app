import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function resetPrimaryKey() {
  return new Promise((resolve, reject) => {
    // Comando SQL para reiniciar el contador de IDs en PostgreSQL
    prisma.$executeRawUnsafe('TRUNCATE TABLE "products" RESTART IDENTITY CASCADE;')
      .then(() => {
        console.log('Contador de IDs reiniciado.');
        resolve(null);
      })
      .catch((err) => {
        console.error('Error reiniciando los IDs:', err);
        reject(err);
      });
  });
}

async function main() {
  // Leer el archivo JSON
  const data = JSON.parse(
    fs.readFileSync('./prisma/seeders/products.json', 'utf-8')
  );

  // Eliminar datos y reiniciar IDs
  await resetPrimaryKey();

  // Insertar nuevos datos desde el JSON
  await prisma.products.createMany({ data });
  console.log('Nuevos registros insertados desde el archivo JSON.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
