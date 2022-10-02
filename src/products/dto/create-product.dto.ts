import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProductTag } from '../product-tag.enum';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  price: number;

  @IsEnum(ProductTag)
  tag: ProductTag;
}
