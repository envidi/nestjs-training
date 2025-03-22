import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ProductEntity, UserEntity } from 'src/typeorm';
import { CategoryEntity } from 'src/typeorm/category.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [UserEntity, ProductEntity, CategoryEntity],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get('dbHost'),
    port: parseInt(configService.get('dbPort')),
    username: configService.get('username'),
    password: configService.get('password'),
    database: configService.get('dbName'),
    entities: [UserEntity, ProductEntity, CategoryEntity],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js'],
  }),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
