import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VentasController],
  providers: [VentasService, PrismaService],
})
export class VentasModule {}
