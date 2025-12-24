import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column('text')
    content: string;

    @Column({ default: false })
    isArchived: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Category, (category) => category.notes, {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'notes_categories',
        joinColumn: { name: 'note_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
    })
    categories: Category[];
}
