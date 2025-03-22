import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CategoryEntity } from 'src/typeorm/category.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async createCategory(product: CreateCategoryDto) {
    const newProduct = await this.categoryRepo.create(product);

    return this.categoryRepo.save(newProduct);
  }
  async findOneCate(id: CreateProductDto[]) {
    return this.categoryRepo.findBy({
      id: In(id),
    });
  }
  async findAllCategory(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<CategoryEntity>> {
    return this.paginate({ page, limit });
  }
  async delete(id: number) {
    return this.categoryRepo.delete(id);
  }
  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<CategoryEntity>> {
    const queryBuilder = this.categoryRepo.createQueryBuilder('p');
    queryBuilder.orderBy('p.id', 'ASC');
    return paginate<CategoryEntity>(queryBuilder, options);
  }
}
