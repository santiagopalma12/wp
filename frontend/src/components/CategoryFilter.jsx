import './CategoryFilter.css';

function CategoryFilter({ categories, selectedCategory, onSelect }) {
    return (
        <div className="category-filter">
            <span className="filter-label">Filtrar:</span>
            <div className="filter-options">
                <button
                    className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
                    onClick={() => onSelect(null)}
                >
                    Todas
                </button>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        style={{
                            '--category-color': category.color,
                        }}
                        onClick={() => onSelect(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
