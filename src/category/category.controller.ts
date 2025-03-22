import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private productService: CategoryService) {}
  @Post()
  async createCategory(@Body() product: CreateCategoryDto) {
    return this.productService.createCategory(product);
  }
  @Get()
  async findAllProduct() {
    return this.productService.findAllCategory();
  }
  @Delete(':id')
  async deleteProduct(@Param() id: number) {
    return this.productService.delete(id);
  }
}
