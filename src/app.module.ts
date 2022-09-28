import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: String(process.env.POSTGRES_USER),
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      entities: [],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}
