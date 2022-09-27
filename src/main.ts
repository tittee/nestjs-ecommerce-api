import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');

  await app.useGlobalPipes(new ValidationPipe());
  await app.enableCors();

  await app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
    parseOptions: {}, // options for parsing cookies
  } as FastifyCookieOptions);

  await app.listen(3000);
}
bootstrap();
