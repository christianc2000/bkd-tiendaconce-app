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
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() product: UpdateProductDto) {
    return this.productsService.update(id, product);
  }

  @Delete('/:id')
  remove(@Param('id') id:number){
    return this.productsService.remove(id);
  }

  @Get('/next/id')
  nextProductId(){
    return this.productsService.getNextId();
  }
}
