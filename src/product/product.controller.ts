import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }
  @Get()
  async findAllProduct() {
    return this.productService.findAllProduct();
  }
  @Delete(':id')
  async deleteProduct(@Param() id: number) {
    return this.productService.delete(id);
  }
}
