import {
    IsArray,
    ValidateNested,
    IsString,
    IsNotEmpty,
    IsDateString,
    IsDate,
    IsOptional,
    Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    product_id: string;

    @IsNotEmpty()
    quantity: number;
}

export class CreateSaleDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    orders: OrderItemDto[];

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @Matches(/^\d{2}\/\d{2}.\d{4}$/, {
        message: 'comfort_date must be in the format DD/MM.YYYY',
    })
    comfort_date: string;
}
