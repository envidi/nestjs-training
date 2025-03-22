import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { SeedService } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Nest')
    .setDescription('Nest swagger')
    .setVersion('1.0')
    .addCookieAuth(
      'accessToken',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'Access Token',
    )
    .build();
  // const seedService = app.get(SeedService);
  // for (let index = 0; index < 2; index++) {
  //   await seedService.seed();
  // }
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `App is listening on port http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
