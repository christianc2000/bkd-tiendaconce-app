import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VentasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVentaDto: CreateVentaDto) {
    // Validar unicidad de cod_venta
    const existingVenta = await this.prisma.ventas.findUnique({
      where: { cod_venta: createVentaDto.cod_venta },
    });
    if (existingVenta) {
      throw new BadRequestException('El código de venta ya existe.');
    }
    // Validar lógica de los items
    let sumaSubtotales = 0;

    // Validar lógica de los items
    for (const item of createVentaDto.items) {
      // Verificar si el producto existe en la tabla productos
      const producto = await this.prisma.products.findUnique({
        where: { cod_prod: item.cod_prod },
      });
      if (!producto) {
        throw new BadRequestException(
          `El producto con código ${item.cod_prod} no existe.`,
        );
      }
  
      if (item.cantidad <= 0) {
        throw new BadRequestException(
          `La cantidad del producto ${item.cod_prod} debe ser mayor a 0.`,
        );
      }
      if (item.precio_subtot !== item.cantidad * item.precio_uni_prod) {
        throw new BadRequestException(
          `El subtotal del producto ${item.cod_prod} es incorrecto.`,
        );
      }
  
      // Sumar el subtotal del item para validar el total
      sumaSubtotales += item.precio_subtot;
    }

    // Validar que el total_venta sea igual a la suma de los subtotales
    if (createVentaDto.total_venta !== sumaSubtotales) {
      throw new BadRequestException(
        `El total de la venta (${createVentaDto.total_venta}) no coincide con la suma de los subtotales (${sumaSubtotales}).`,
      );
    }
    // Crear la venta dentro de una transacción
    try {
      return this.prisma.$transaction(async (tx) => {
        const venta = await tx.ventas.create({
          data: {
            cod_venta: createVentaDto.cod_venta,
            total_venta: createVentaDto.total_venta,
            items: {
              create: createVentaDto.items.map((item) => ({
                cod_prod: item.cod_prod,
                nombre_prod: item.nombre_prod,
                precio_uni_prod: item.precio_uni_prod,
                cantidad: item.cantidad,
                precio_subtot: item.precio_subtot,
              })),
            },
          },
          include: {
            items: true,
          },
        });
        const idsVenta = await this.prisma.ids_ventas.findFirst();
        if (!idsVenta) {
          // Si no existe la tabla `ids_products`, crea un registro inicial
          await this.prisma.ids_ventas.create({
            data: {
              cantidad: 1,
            },
          });
        } else {
          // Si ya existe, incrementa la cantidad
          await this.prisma.ids_ventas.update({
            where: { id: idsVenta.id },
            data: { cantidad: { increment: 1 } },
          });
        }
        return venta;
      });
    } catch (error) {
      // Manejo de errores de Prisma
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `El valor único ya existe en el campo: ${error.meta?.target}`,
        );
      }
      throw new HttpException(
        'Ha ocurrido un error inesperado.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.prisma.ventas.findMany();
  }

  async findOne(id: number) {
    const ventaFound = await this.prisma.ventas.findUnique({
      where: {
        id,
      },
    });

    if (!ventaFound) {
      throw new NotFoundException(`¡La venta con ID ${id} no fué encontrado!`);
    }

    return await ventaFound;
  }

  async getNextId() {
    // Obtener el registro en ids_ventas y sumar 1 a la cantidad
    const idVenta = await this.prisma.ids_ventas.findFirst();

    return {
      next_id: idVenta ? idVenta.cantidad + 1 : 1, // Manejar si no existe registro en ids_ventas
    };
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    // const existingVenta = await this.prisma.ventas.findUnique({
    //   where: { id },
    // });
    // if (!existingVenta) {
    //   throw new NotFoundException(`¡La venta con ID ${id} no fue encontrada!`);
    // }
    // return await this.prisma.ventas.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     ...updateVentaDto,
    //   },
    // });
  }

  async remove(id: number) {
    const existingVenta = await this.prisma.ventas.findUnique({
      where: { id },
    });

    if (!existingVenta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrado`);
    }

    return await this.prisma.ventas.delete({
      where: {
        id,
      },
    });
  }
}
