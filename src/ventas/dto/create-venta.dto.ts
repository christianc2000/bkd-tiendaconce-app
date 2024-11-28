import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class CreateVentaDto {
  @IsNotEmpty()
  cod_venta: string;

  @IsNumber()
  total_venta: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items: CreateItemDto[];
}
