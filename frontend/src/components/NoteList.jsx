import NoteCard from './NoteCard';
import './NoteList.css';

function NoteList({
    notes,
    onEdit,
    onDelete,
    onArchive,
    onUnarchive,
    loading,
    emptyMessage,
    categories,
    onAddCategory,
    onRemoveCategory
}) {
    if (loading) {
        return (
            <div className="notes-loading">
                <div className="spinner"></div>
                <p>Cargando notas...</p>
            </div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="notes-empty">
                <span className="empty-icon">📝</span>
                <p>{emptyMessage || 'No hay notas disponibles'}</p>
            </div>
        );
    }

    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    onUnarchive={onUnarchive}
                    categories={categories}
                    onAddCategory={onAddCategory}
                    onRemoveCategory={onRemoveCategory}
                />
            ))}
        </div>
    );
}

export default NoteList;
