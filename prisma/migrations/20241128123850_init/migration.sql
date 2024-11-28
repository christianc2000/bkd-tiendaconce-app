-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "cod_prod" TEXT NOT NULL,
    "nombre_prod" TEXT NOT NULL,
    "nombre_comun_prod" TEXT NOT NULL,
    "descripcion_prod" TEXT NOT NULL,
    "precio_venta_prod" DOUBLE PRECISION NOT NULL,
    "precio_compra_prod" DOUBLE PRECISION NOT NULL,
    "foto_prod" TEXT NOT NULL,
    "cantidad_prod" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ids_products" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ids_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ids_ventas" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ids_ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "cod_venta" TEXT NOT NULL,
    "total_venta" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "cod_prod" TEXT NOT NULL,
    "nombre_prod" TEXT NOT NULL,
    "precio_uni_prod" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_subtot" DOUBLE PRECISION NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_cod_prod_key" ON "products"("cod_prod");

-- CreateIndex
CREATE UNIQUE INDEX "ventas_cod_venta_key" ON "ventas"("cod_venta");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "ventas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
