import { CommandCategory } from '../data/commands';
import './CategoryFilter.css';

interface CategoryFilterProps {
  categories: CommandCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <button
        className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        <span className="category-button-icon">📚</span>
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button ${
            selectedCategory === category.id ? 'active' : ''
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="category-button-icon">{category.icon}</span>
          {category.title}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
