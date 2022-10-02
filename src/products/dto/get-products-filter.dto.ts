import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProductTag } from '../product-tag.enum';

export class GetProductsFilterDto {
  @IsOptional()
  @IsEnum(ProductTag)
  tag?: ProductTag;

  @IsOptional()
  @IsString()
  search?: string;
}
