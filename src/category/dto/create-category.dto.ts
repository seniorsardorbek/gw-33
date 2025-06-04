import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Category name',
        example: 'name'
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
