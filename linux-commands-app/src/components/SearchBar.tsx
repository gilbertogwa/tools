import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalResults: number;
}

function SearchBar({ searchTerm, onSearchChange, totalResults }: SearchBarProps) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar comandos... (ex: docker, ssh, arquivo)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          autoFocus
        />
        {searchTerm && (
          <button
            className="clear-button"
            onClick={() => onSearchChange('')}
            title="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="search-results-info">
          {totalResults} resultado{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
