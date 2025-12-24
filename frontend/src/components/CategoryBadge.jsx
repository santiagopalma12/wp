import './CategoryBadge.css';

function CategoryBadge({ category, onRemove, small = false }) {
    return (
        <span
            className={`category-badge ${small ? 'small' : ''}`}
            style={{ backgroundColor: category.color || '#667eea' }}
        >
            {category.name}
            {onRemove && (
                <button
                    className="badge-remove"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(category.id);
                    }}
                >
                    ×
                </button>
            )}
        </span>
    );
}

export default CategoryBadge;
