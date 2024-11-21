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
  constructor(private prisma: PrismaService) {}

  getAllProducts() {
    return this.prisma.products.findMany();
  }

  getProduct(id: number) {
    const productFound = this.prisma.products.findUnique({
      where:{
        id
      }
    });

    if (!productFound) {
      return new NotFoundException(`¡El producto con id=${id} no fué encontrado!`);
    }

    return productFound;
  }

  async createProduct(createProductDto: CreateProductDto) {
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

    // Si no existe, procedemos a crear el nuevo producto
    return this.prisma.products.create({
      data: createProductDto,
    });
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    const existingProduct = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found`);
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

  async deleteProduct(id: number) {
    const existingProduct = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return await this.prisma.products.delete({
      where: {
        id,
      },
    });
  }

  async getNextId(): Promise<number> {
    // Obtener el id máximo de la tabla
    const maxProduct = await this.prisma.products.findFirst({
      orderBy: {
        id: 'desc', // Ordena por id de forma descendente
      },
      select: {
        id: true, // Solo selecciona el campo id
      },
    });

    // Si no hay registros, el siguiente id será 1
    return (maxProduct?.id ?? 0) + 1;
  }
}
