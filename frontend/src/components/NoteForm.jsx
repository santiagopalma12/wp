import { useState, useEffect } from 'react';
import './NoteForm.css';

function NoteForm({ isOpen, onClose, onSubmit, editNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editNote) {
            setTitle(editNote.title);
            setContent(editNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [editNote, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);
        try {
            await onSubmit({ title: title.trim(), content: content.trim() });
            setTitle('');
            setContent('');
            onClose();
        } catch (error) {
            console.error('Error submitting note:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editNote ? '✏️ Editar Nota' : '➕ Nueva Nota'}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Escribe el título de tu nota..."
                            maxLength={255}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Escribe el contenido de tu nota..."
                            rows={6}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={isSubmitting || !title.trim() || !content.trim()}
                        >
                            {isSubmitting ? 'Guardando...' : (editNote ? 'Actualizar' : 'Crear Nota')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NoteForm;
