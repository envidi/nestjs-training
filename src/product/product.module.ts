import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CategoryEntity } from 'src/typeorm/category.entity';

@Module({
  providers: [
    ProductService,
    {
      provide: CategoryService,
      useClass: CategoryService,
    },
  ],
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
})
export class ProductModule {}
