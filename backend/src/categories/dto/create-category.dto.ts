import { IsNotEmpty, IsString, MaxLength, IsOptional, IsHexColor } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsHexColor()
    @IsOptional()
    color?: string;
}
