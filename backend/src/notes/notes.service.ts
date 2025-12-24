import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private readonly notesRepository: Repository<Note>,
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) { }

    async create(createNoteDto: CreateNoteDto): Promise<Note> {
        const note = this.notesRepository.create(createNoteDto);
        note.categories = [];
        return this.notesRepository.save(note);
    }

    async findAllActive(categoryId?: number): Promise<Note[]> {
        const query = this.notesRepository
            .createQueryBuilder('note')
            .leftJoinAndSelect('note.categories', 'category')
            .where('note.isArchived = :isArchived', { isArchived: false })
            .orderBy('note.createdAt', 'DESC');

        if (categoryId) {
            query.andWhere('category.id = :categoryId', { categoryId });
        }

        return query.getMany();
    }

    async findAllArchived(categoryId?: number): Promise<Note[]> {
        const query = this.notesRepository
            .createQueryBuilder('note')
            .leftJoinAndSelect('note.categories', 'category')
            .where('note.isArchived = :isArchived', { isArchived: true })
            .orderBy('note.createdAt', 'DESC');

        if (categoryId) {
            query.andWhere('category.id = :categoryId', { categoryId });
        }

        return query.getMany();
    }

    async findOne(id: number): Promise<Note | null> {
        return this.notesRepository.findOne({
            where: { id },
            relations: ['categories'],
        });
    }

    async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note | null> {
        await this.notesRepository.update(id, updateNoteDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        // First, clear the categories relationship to avoid FK constraint issues
        const note = await this.findOne(id);
        if (note) {
            note.categories = [];
            await this.notesRepository.save(note);
        }
        await this.notesRepository.delete(id);
    }

    async archive(id: number): Promise<Note | null> {
        await this.notesRepository.update(id, { isArchived: true });
        return this.findOne(id);
    }

    async unarchive(id: number): Promise<Note | null> {
        await this.notesRepository.update(id, { isArchived: false });
        return this.findOne(id);
    }

    async addCategory(noteId: number, categoryId: number): Promise<Note | null> {
        const note = await this.findOne(noteId);
        const category = await this.categoriesRepository.findOneBy({ id: categoryId });

        if (!note || !category) return null;

        if (!note.categories.some((c) => c.id === categoryId)) {
            note.categories.push(category);
            await this.notesRepository.save(note);
        }

        return this.findOne(noteId);
    }

    async removeCategory(noteId: number, categoryId: number): Promise<Note | null> {
        const note = await this.findOne(noteId);

        if (!note) return null;

        note.categories = note.categories.filter((c) => c.id !== categoryId);
        await this.notesRepository.save(note);

        return this.findOne(noteId);
    }
}
