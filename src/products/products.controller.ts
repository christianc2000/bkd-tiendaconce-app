import { UpdateProductDto } from './dto/update-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
// import { ApiTags } from '@nestjs/swagger';

@Controller('products')
// @ApiTags('apitags')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: number) {
    return this.productsService.getProduct(id);
  }

  @Post()
  createTask(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() product: UpdateProductDto) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id:number){
    return this.productsService.deleteProduct(id);
  }

  @Get('/next/id')
  nextProductId(){
    return this.productsService.getNextId();
  }
}
