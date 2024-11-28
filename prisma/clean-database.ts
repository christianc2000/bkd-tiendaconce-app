import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    // Eliminar datos de las tablas
    await prisma.ids_products.deleteMany({});
    await prisma.products.deleteMany({});
    await prisma.ventas.deleteMany({});
    console.log('Datos eliminados.');

    // Reiniciar los IDs (depende de la base de datos)
    await prisma.$executeRaw`ALTER SEQUENCE products_id_seq RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE ids_products_id_seq RESTART WITH 1`;    
    await prisma.$executeRaw`ALTER SEQUENCE ventas_id_seq RESTART WITH 1`;   
    console.log('IDs reiniciados.');
  } catch (error) {
    console.error('Error al reiniciar la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
