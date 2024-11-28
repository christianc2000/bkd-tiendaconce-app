import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  cod_prod: string;

  @IsNotEmpty()
  nombre_prod: string;

  @IsNumber()
  @Min(0)
  precio_uni_prod: number;

  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precio_subtot: number;
}
