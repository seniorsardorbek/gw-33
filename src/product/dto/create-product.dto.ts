import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, Min, Max, IsMongoId } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;


    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        return value;
    })
    @IsNumber()
    @Min(0)
    price: number;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return parseInt(value, 10);
        }
        return value;
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    quantity?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    sizes?: string[];

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return parseFloat(value);
        }
        return value;
    })
    @IsNumber()
    @Min(0)
    @Max(5)
    @IsOptional()
    stars?: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    colors?: string[];

    @IsMongoId()
    category: string;
}