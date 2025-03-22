import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ProductEntity } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/typeorm/category.entity';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  exports: [CategoryService],
})
export class CategoryModule {}
