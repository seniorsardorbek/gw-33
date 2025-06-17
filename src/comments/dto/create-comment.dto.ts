import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  stars: number;
}
