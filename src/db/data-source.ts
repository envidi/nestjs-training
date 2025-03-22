import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
// import { ProductEntity, UserEntity } from 'src/typeorm';
// import { CategoryEntity } from 'src/typeorm/category.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from 'src/config/configuration';
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configuration().dbHost,
  port: configuration().dbPort,
  username: configuration().username,
  password: configuration().password,
  database: configuration().dbName,
  entities: ['dist/src/typeorm/*.entity.js'],
  // entities: [UserEntity, ProductEntity, CategoryEntity],
  synchronize: false,
  migrations: ['dist/src/db/migrations/*.js'],
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
    entities: ['dist/src/typeorm/*.entity.js'],
    // entities: [UserEntity, ProductEntity, CategoryEntity],
    synchronize: false,
    migrations: ['dist/src/db/migrations/*.js'],
  }),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
