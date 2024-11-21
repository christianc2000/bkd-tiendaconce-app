import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    @Length(4)
    cod_prod:string;

    @IsString()
    @IsNotEmpty()
    nombre_prod:string;

    @IsString()
    @IsNotEmpty()
    nombre_comun_prod:string;

    @IsString()
    @IsNotEmpty()
    descripcion_prod:string;

    @IsNumber()
    @Min(0)
    precio_venta_prod:number;

    @IsNumber()
    @Min(0)
    precio_compra_prod:number;

    @IsString()
    foto_prod:string;

    @IsNumber()
    @Min(0)
    cantidad_prod:number;
}