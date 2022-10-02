import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { Logger } from '@nestjs/common';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductsController');

  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query() filterDto: GetProductsFilterDto,
    @GetUser() user: User,
  ): Promise<Product[]> {
    this.logger.verbose(
      `User "${
        user.username
      }" retrieving all products. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.productsService.getProducts(filterDto, user);
  }

  @Get('/:id')
  getProductById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.getProductById(id, user);
  }

  @Get('/:userId')
  getProductByUserId(@Param('userId') userId: string): Promise<Product[]> {
    return this.productsService.getProductByUserId(userId);
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    this.logger.verbose(
      `User "${user.username}" creating a new product. Data: ${JSON.stringify(
        createProductDto,
      )}`,
    );
    return this.productsService.createProduct(createProductDto, user);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.productsService.deleteProduct(id, user);
  }

  @Patch('/:id/tag')
  updateProductTag(
    @Param('id') id: string,
    @Body() updateProductTagDto: UpdateProductTagDto,
    @GetUser() user: User,
  ): Promise<Product> {
    const { tag } = updateProductTagDto;
    return this.productsService.updateProductTag(id, tag, user);
  }
}
