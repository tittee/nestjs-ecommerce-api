import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.setGlobalPrefix('api');
  await app.enableCors();
  await app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('NestJS Ecommerce API')
    .setDescription('The cats API description')
    .addTag('produts')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  await app.listen(3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
