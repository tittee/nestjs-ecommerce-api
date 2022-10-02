import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { ProductTag } from './product-tag.enum';
import { Product } from './product.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  private logger = new Logger('ProductsRepository', true);

  async getProducts(
    filterDto: GetProductsFilterDto,
    user: User,
  ): Promise<Product[]> {
    const { tag, search } = filterDto;

    const query = this.createQueryBuilder('product');
    query.where({ user });

    if (tag) {
      query.andWhere('product.tag = :tag', { tag });
    }

    if (search) {
      query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.tag) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(
        `Failed to get products for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { name, slug, price, tag } = createProductDto;

    const product = this.create({
      name,
      slug,
      price,
      tag,
      user,
    });

    await this.save(product);
    return product;
  }
}
