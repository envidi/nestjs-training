import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;
  @ManyToMany(() => CategoryEntity, (category) => category.products)
  categories: CategoryEntity[];
}
