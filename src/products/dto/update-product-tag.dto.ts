import { IsEnum } from 'class-validator';
import { ProductTag } from '../product-tag.enum';

export class UpdateProductTagDto {
  @IsEnum(ProductTag)
  tag: ProductTag;
}
