import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoriesRepository.create(createCategoryDto);
        return this.categoriesRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return this.categoriesRepository.find({
            order: { name: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Category | null> {
        return this.categoriesRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.categoriesRepository.delete(id);
    }
}
