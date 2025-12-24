import { useState } from 'react';
import CategorySelector from './CategorySelector';
import './NoteCard.css';

function NoteCard({
    note,
    onEdit,
    onDelete,
    onArchive,
    onUnarchive,
    categories,
    onAddCategory,
    onRemoveCategory
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
            setIsDeleting(true);
            await onDelete(note.id);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className={`note-card ${isDeleting ? 'deleting' : ''}`}>
            <div className="note-card-header">
                <h3 className="note-title">{note.title}</h3>
                <span className="note-date">{formatDate(note.createdAt)}</span>
            </div>

            <p className="note-content">{note.content}</p>

            {categories && (
                <div className="note-categories">
                    <CategorySelector
                        categories={categories}
                        selectedCategories={note.categories || []}
                        onAdd={(categoryId) => onAddCategory(note.id, categoryId)}
                        onRemove={(categoryId) => onRemoveCategory(note.id, categoryId)}
                    />
                </div>
            )}

            <div className="note-actions">
                <button className="btn btn-edit" onClick={() => onEdit(note)}>
                    ✏️ Editar
                </button>

                {note.isArchived ? (
                    <button className="btn btn-unarchive" onClick={() => onUnarchive(note.id)}>
                        📤 Desarchivar
                    </button>
                ) : (
                    <button className="btn btn-archive" onClick={() => onArchive(note.id)}>
                        📥 Archivar
                    </button>
                )}

                <button className="btn btn-delete" onClick={handleDelete} disabled={isDeleting}>
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
}

export default NoteCard;
