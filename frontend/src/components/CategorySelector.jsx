import { useState } from 'react';
import CategoryBadge from './CategoryBadge';
import './CategorySelector.css';

function CategorySelector({ categories, selectedCategories, onAdd, onRemove }) {
    const [isOpen, setIsOpen] = useState(false);

    const availableCategories = categories.filter(
        (cat) => !selectedCategories.some((selected) => selected.id === cat.id)
    );

    return (
        <div className="category-selector">
            <div className="selected-categories">
                {selectedCategories.map((category) => (
                    <CategoryBadge
                        key={category.id}
                        category={category}
                        onRemove={onRemove}
                        small
                    />
                ))}

                {availableCategories.length > 0 && (
                    <button
                        className="add-category-btn"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        + Agregar
                    </button>
                )}
            </div>

            {isOpen && availableCategories.length > 0 && (
                <div className="categories-dropdown">
                    {availableCategories.map((category) => (
                        <button
                            key={category.id}
                            className="dropdown-item"
                            style={{ borderLeftColor: category.color }}
                            onClick={() => {
                                onAdd(category.id);
                                setIsOpen(false);
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategorySelector;
