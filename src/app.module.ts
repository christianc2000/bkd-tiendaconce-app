import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { VentasModule } from './ventas/ventas.module';

@Module({
  imports: [ProductsModule, VentasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
