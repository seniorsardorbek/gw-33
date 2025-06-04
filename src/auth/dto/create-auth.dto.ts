import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class RegisterAuthDto {
    @IsString()
    password: string

    @IsString()
    @IsOptional()
    phonenumber?: string

    @IsString()
    @IsOptional()
    email?: string

    @IsString()
    @IsNotEmpty()
    fullname: string
}
