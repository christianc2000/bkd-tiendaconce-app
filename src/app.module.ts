import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/tasks.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TaskModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
