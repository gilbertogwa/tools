import { useState, useMemo } from 'react';
import { commandsData } from './data/commands';
import CommandCard from './components/CommandCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtrar comandos baseado na busca e categoria
  const filteredData = useMemo(() => {
    let data = commandsData;

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      data = data.filter((cat) => cat.id === selectedCategory);
    }

    // Filtrar por termo de busca
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      data = data
        .map((category) => ({
          ...category,
          commands: category.commands.filter(
            (cmd) =>
              cmd.command.toLowerCase().includes(searchLower) ||
              cmd.description.toLowerCase().includes(searchLower)
          ),
        }))
        .filter((category) => category.commands.length > 0);
    }

    return data;
  }, [searchTerm, selectedCategory]);

  // Contar total de comandos visíveis
  const totalCommands = useMemo(() => {
    return filteredData.reduce((sum, cat) => sum + cat.commands.length, 0);
  }, [filteredData]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🐧</span>
            Linux Commands
            <span className="title-subtitle">Guia Rápido</span>
          </h1>
          <p className="app-description">
            AlmaLinux | CentOS | Ubuntu
          </p>
        </div>
      </header>

      <div className="controls-section">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalResults={totalCommands}
        />
        <CategoryFilter
          categories={commandsData}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <main className="app-main">
        {filteredData.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h2>Nenhum comando encontrado</h2>
            <p>
              Tente ajustar sua busca ou selecionar outra categoria
            </p>
          </div>
        ) : (
          <div className="categories-container">
            {filteredData.map((category) => (
              <section key={category.id} className="category-section">
                <h2 className="category-title">
                  <span className="category-icon">{category.icon}</span>
                  {category.title}
                  <span className="category-count">
                    {category.commands.length} comando{category.commands.length !== 1 ? 's' : ''}
                  </span>
                </h2>
                <div className="commands-grid">
                  {category.commands.map((command, index) => (
                    <CommandCard
                      key={`${category.id}-${index}`}
                      command={command}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Criado para consulta rápida | Mantenha atualizado conforme sua necessidade
        </p>
      </footer>
    </div>
  );
}

export default App;
