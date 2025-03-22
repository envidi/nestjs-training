import { Inject, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @Inject(CategoryService) private categoryService: CategoryService,
  ) {}

  async createProduct(product: CreateProductDto) {
    const newProduct = await this.productRepo.create(product);
    const category = await this.categoryService.findOneCate(product.categories);
    newProduct.categories = category;
    return this.productRepo.save(newProduct);
  }
  async findAllProduct(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    //   ): Promise<Pagination<ProductEntity>> {
    return this.productRepo.find({
      relations: ['categories'],
    });
    // return this.paginate({ page, limit });
  }
  async delete(id: number) {
    return this.productRepo.delete(id);
  }
  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<ProductEntity>> {
    const queryBuilder = this.productRepo.createQueryBuilder('p');
    queryBuilder.leftJoin('p.categories', 'category').orderBy('p.id', 'ASC');
    return paginate<ProductEntity>(queryBuilder, options);
  }
}
