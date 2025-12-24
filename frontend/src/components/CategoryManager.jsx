import { useState } from 'react';
import './CategoryManager.css';

const PRESET_COLORS = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#fa709a', '#fee140', '#30cfd0', '#a8edea',
];

function CategoryManager({ categories, onCreate, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [color, setColor] = useState(PRESET_COLORS[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onCreate({ name: name.trim(), color });
        setName('');
        setColor(PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]);
    };

    return (
        <div className="category-manager">
            <button className="manage-btn" onClick={() => setIsOpen(!isOpen)}>
                🏷️ Categorías
            </button>

            {isOpen && (
                <div className="manager-dropdown">
                    <div className="dropdown-header">
                        <h4>Gestionar Categorías</h4>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <form onSubmit={handleSubmit} className="new-category-form">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nueva categoría..."
                            maxLength={100}
                        />
                        <div className="color-picker">
                            {PRESET_COLORS.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    className={`color-option ${color === c ? 'selected' : ''}`}
                                    style={{ backgroundColor: c }}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </div>
                        <button type="submit" className="add-btn" disabled={!name.trim()}>
                            Agregar
                        </button>
                    </form>

                    <div className="categories-list">
                        {categories.length === 0 ? (
                            <p className="empty-msg">No hay categorías</p>
                        ) : (
                            categories.map((category) => (
                                <div key={category.id} className="category-item">
                                    <span
                                        className="category-color"
                                        style={{ backgroundColor: category.color }}
                                    />
                                    <span className="category-name">{category.name}</span>
                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(category.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryManager;
