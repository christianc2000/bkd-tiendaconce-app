import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class UpdateProductDto{

    @IsString()
    nombre_prod:string;

    @IsString()
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