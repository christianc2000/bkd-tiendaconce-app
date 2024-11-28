import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.products.findMany();
  }

  findOne(id: number) {
    const productFound = this.prisma.products.findUnique({
      where: {
        id,
      },
    });

    if (!productFound) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado!`,
      );
    }

    return productFound;
  }

  async getNextId() {
    // Obtener el registro en ids_products y sumar 1 a la cantidad
    const idProduct = await this.prisma.ids_products.findFirst();

    return {
      next_id: idProduct ? idProduct.cantidad + 1 : 1, // Manejar si no existe registro en ids_products
    };
  }

  async create(createProductDto: CreateProductDto) {
    // Verificamos si ya existe un producto con el mismo cod_prod
    const existingProduct = await this.prisma.products.findUnique({
      where: {
        cod_prod: createProductDto.cod_prod, // Campo a verificar
      },
    });

    // Si existe, lanzamos un error con un mensaje adecuado
    if (existingProduct) {
      throw new ConflictException('El código de producto ya está en uso');
    }

    const idsProduct = await this.prisma.ids_products.findFirst();
    if (!idsProduct) {
      // Si no existe la tabla `ids_products`, crea un registro inicial
      await this.prisma.ids_products.create({
        data: {
          cantidad: 1,
        },
      });
    } else {
      // Si ya existe, incrementa la cantidad
      await this.prisma.ids_products.update({
        where: { id: idsProduct.id },
        data: { cantidad: { increment: 1 } },
      });
    }
    // Si no existe, procedemos a crear el nuevo producto
    return await this.prisma.products.create({
      data: createProductDto,
    });
  }

  async update(id: number, product: UpdateProductDto) {
    const existingProduct = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return await this.prisma.products.update({
      where: {
        id,
      },
      data: {
        ...product,
      },
    });
  }

  async remove(id: number) {
    const existingProduct = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return await this.prisma.products.delete({
      where: {
        id,
      },
    });
  }
}
