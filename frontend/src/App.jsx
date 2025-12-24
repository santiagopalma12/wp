import { useState, useEffect } from 'react';
import notesApi, { categoriesApi } from './services/notesApi';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import CategoryFilter from './components/CategoryFilter';
import CategoryManager from './components/CategoryManager';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('active'); // 'active' or 'archived'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch notes based on current view and filter
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = view === 'active'
        ? await notesApi.getActiveNotes(selectedCategory)
        : await notesApi.getArchivedNotes(selectedCategory);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [view, selectedCategory]);

  // Create or update note
  const handleSubmit = async (data) => {
    if (editNote) {
      await notesApi.updateNote(editNote.id, data);
    } else {
      await notesApi.createNote(data);
    }
    setEditNote(null);
    fetchNotes();
  };

  // Delete note
  const handleDelete = async (id) => {
    await notesApi.deleteNote(id);
    fetchNotes();
  };

  // Archive note
  const handleArchive = async (id) => {
    await notesApi.archiveNote(id);
    fetchNotes();
  };

  // Unarchive note
  const handleUnarchive = async (id) => {
    await notesApi.unarchiveNote(id);
    fetchNotes();
  };

  // Open edit form
  const handleEdit = (note) => {
    setEditNote(note);
    setIsFormOpen(true);
  };

  // Open create form
  const handleCreate = () => {
    setEditNote(null);
    setIsFormOpen(true);
  };

  // Category management
  const handleCreateCategory = async (data) => {
    await categoriesApi.createCategory(data);
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    await categoriesApi.deleteCategory(id);
    if (selectedCategory === id) {
      setSelectedCategory(null);
    }
    fetchCategories();
    fetchNotes();
  };

  // Add category to note
  const handleAddCategory = async (noteId, categoryId) => {
    await notesApi.addCategoryToNote(noteId, categoryId);
    fetchNotes();
  };

  // Remove category from note
  const handleRemoveCategory = async (noteId, categoryId) => {
    await notesApi.removeCategoryFromNote(noteId, categoryId);
    fetchNotes();
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📝 Notes App</h1>
          <p className="subtitle">Organiza tus ideas de forma simple</p>
        </div>
      </header>

      <nav className="app-nav">
        <div className="nav-left">
          <div className="nav-tabs">
            <button
              className={`nav-tab ${view === 'active' ? 'active' : ''}`}
              onClick={() => setView('active')}
            >
              📋 Activas
            </button>
            <button
              className={`nav-tab ${view === 'archived' ? 'active' : ''}`}
              onClick={() => setView('archived')}
            >
              📥 Archivadas
            </button>
          </div>

          {categories.length > 0 && (
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          )}
        </div>

        <div className="nav-right">
          <CategoryManager
            categories={categories}
            onCreate={handleCreateCategory}
            onDelete={handleDeleteCategory}
          />
          <button className="btn-new-note" onClick={handleCreate}>
            ➕ Nueva Nota
          </button>
        </div>
      </nav>

      <main className="app-main">
        <NoteList
          notes={notes}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
          categories={categories}
          onAddCategory={handleAddCategory}
          onRemoveCategory={handleRemoveCategory}
          emptyMessage={
            view === 'active'
              ? 'No tienes notas activas. ¡Crea una nueva!'
              : 'No tienes notas archivadas.'
          }
        />
      </main>

      <NoteForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditNote(null);
        }}
        onSubmit={handleSubmit}
        editNote={editNote}
      />
    </div>
  );
}

export default App;
