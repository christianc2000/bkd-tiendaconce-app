-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "cod_prod" TEXT NOT NULL,
    "nombre_prod" TEXT NOT NULL,
    "nombre_comun_prod" TEXT NOT NULL,
    "descripcion_prod" TEXT NOT NULL,
    "precio_venta_prod" DOUBLE PRECISION NOT NULL,
    "precio_compra_prod" DOUBLE PRECISION NOT NULL,
    "foto_prod" TEXT NOT NULL,
    "cantidad_prod" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" TEXT NOT NULL,
    "cod_venta" TEXT NOT NULL,
    "total_venta" DOUBLE PRECISION NOT NULL,
    "fecha_venta" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "cod_prod" TEXT NOT NULL,
    "nombre_prod" TEXT NOT NULL,
    "precio_uni_prod" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_subtot" DOUBLE PRECISION NOT NULL,
    "ventaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_cod_prod_key" ON "products"("cod_prod");

-- CreateIndex
CREATE UNIQUE INDEX "ventas_cod_venta_key" ON "ventas"("cod_venta");

-- CreateIndex
CREATE UNIQUE INDEX "items_cod_prod_key" ON "items"("cod_prod");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "ventas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
