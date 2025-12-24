import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const notesApi = {
    // Get all active notes (with optional category filter)
    getActiveNotes: (categoryId) => {
        const params = categoryId ? { category: categoryId } : {};
        return api.get('/notes', { params });
    },

    // Get all archived notes (with optional category filter)
    getArchivedNotes: (categoryId) => {
        const params = categoryId ? { category: categoryId } : {};
        return api.get('/notes/archived', { params });
    },

    // Get note by ID
    getNote: (id) => api.get(`/notes/${id}`),

    // Create new note
    createNote: (data) => api.post('/notes', data),

    // Update note
    updateNote: (id, data) => api.put(`/notes/${id}`, data),

    // Delete note
    deleteNote: (id) => api.delete(`/notes/${id}`),

    // Archive note
    archiveNote: (id) => api.patch(`/notes/${id}/archive`),

    // Unarchive note
    unarchiveNote: (id) => api.patch(`/notes/${id}/unarchive`),

    // Add category to note
    addCategoryToNote: (noteId, categoryId) =>
        api.post(`/notes/${noteId}/categories/${categoryId}`),

    // Remove category from note
    removeCategoryFromNote: (noteId, categoryId) =>
        api.delete(`/notes/${noteId}/categories/${categoryId}`),
};

export const categoriesApi = {
    // Get all categories
    getCategories: () => api.get('/categories'),

    // Create category
    createCategory: (data) => api.post('/categories', data),

    // Delete category
    deleteCategory: (id) => api.delete(`/categories/${id}`),
};

export default notesApi;
