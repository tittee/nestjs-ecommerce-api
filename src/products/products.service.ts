import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductTag } from './product-tag.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  getProducts(filterDto: GetProductsFilterDto, user: User): Promise<Product[]> {
    return this.productsRepository.getProducts(filterDto, user);
  }

  async getProductById(id: string, user: User): Promise<Product> {
    const found = await this.productsRepository.findOne({
      where: { id, user },
    });

    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return found;
  }

  createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    return this.productsRepository.createProduct(createProductDto, user);
  }

  async deleteProduct(id: string, user: User): Promise<void> {
    const result = await this.productsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async updateProductTag(
    id: string,
    tag: ProductTag,
    user: User,
  ): Promise<Product> {
    const product = await this.getProductById(id, user);

    product.tag = tag;
    await this.productsRepository.save(product);

    return product;
  }
}
