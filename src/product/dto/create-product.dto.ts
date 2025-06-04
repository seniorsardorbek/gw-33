import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;


    @IsString()
    color: string;


    @IsString()
    category: string;


    @IsNumber()
    price: number

    @IsNumber()
    quantity: number
}
