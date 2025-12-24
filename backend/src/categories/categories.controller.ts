import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    NotFoundException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('api/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const category = await this.categoriesService.findOne(id);
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        await this.categoriesService.remove(id);
        return { message: 'Category deleted successfully' };
    }
}
