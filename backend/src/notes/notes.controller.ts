import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    Query,
    NotFoundException,
    ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('api/notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    create(@Body() createNoteDto: CreateNoteDto) {
        return this.notesService.create(createNoteDto);
    }

    @Get()
    findAllActive(@Query('category') categoryId?: string) {
        const catId = categoryId ? parseInt(categoryId, 10) : undefined;
        return this.notesService.findAllActive(catId);
    }

    @Get('archived')
    findAllArchived(@Query('category') categoryId?: string) {
        const catId = categoryId ? parseInt(categoryId, 10) : undefined;
        return this.notesService.findAllArchived(catId);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const note = await this.notesService.findOne(id);
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        return note;
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateNoteDto: UpdateNoteDto,
    ) {
        const note = await this.notesService.update(id, updateNoteDto);
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        return note;
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const note = await this.notesService.findOne(id);
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        await this.notesService.remove(id);
        return { message: 'Note deleted successfully' };
    }

    @Patch(':id/archive')
    async archive(@Param('id', ParseIntPipe) id: number) {
        const note = await this.notesService.archive(id);
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        return note;
    }

    @Patch(':id/unarchive')
    async unarchive(@Param('id', ParseIntPipe) id: number) {
        const note = await this.notesService.unarchive(id);
        if (!note) {
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        return note;
    }

    @Post(':id/categories/:categoryId')
    async addCategory(
        @Param('id', ParseIntPipe) noteId: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        const note = await this.notesService.addCategory(noteId, categoryId);
        if (!note) {
            throw new NotFoundException('Note or Category not found');
        }
        return note;
    }

    @Delete(':id/categories/:categoryId')
    async removeCategory(
        @Param('id', ParseIntPipe) noteId: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        const note = await this.notesService.removeCategory(noteId, categoryId);
        if (!note) {
            throw new NotFoundException(`Note with ID ${noteId} not found`);
        }
        return note;
    }
}
