import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
} from 'typeorm';
import { Note } from '../../notes/entities/note.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ length: 7, default: '#667eea' })
    color: string;

    @ManyToMany(() => Note, (note) => note.categories)
    notes: Note[];
}
