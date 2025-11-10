import React, { useState } from 'react';
import { CustomCategory } from '../types/custom-categories';
import { Command } from '../data/commands';
import { SnippetEditor } from './SnippetEditor';
import '../styles/CategoryManager.css';

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
  customCategories: CustomCategory[];
  protectedCategories: { id: string; title: string; icon: string; isLocked: boolean }[];
  onCreateCategory: (title: string, icon: string, isProtected: boolean) => void;
  onDeleteCategory: (categoryId: string, isProtected: boolean) => void;
  onAddSnippet: (categoryId: string, command: Command, isProtected: boolean) => void;
  onDeleteSnippet: (categoryId: string, commandIndex: number, isProtected: boolean) => void;
  onUnlockProtected: (categoryId: string) => void;
  getProtectedCommands: (categoryId: string) => Command[];
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  isOpen,
  onClose,
  customCategories,
  protectedCategories,
  onCreateCategory,
  onDeleteCategory,
  onAddSnippet,
  onDeleteSnippet,
  onUnlockProtected,
  getProtectedCommands,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newIcon, setNewIcon] = useState('📝');
  const [newIsProtected, setNewIsProtected] = useState(false);

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingIsProtected, setEditingIsProtected] = useState(false);
  const [isSnippetEditorOpen, setIsSnippetEditorOpen] = useState(false);

  if (!isOpen) return null;

  const handleCreateCategory = () => {
    if (!newTitle.trim()) {
      alert('Título é obrigatório');
      return;
    }

    onCreateCategory(newTitle.trim(), newIcon, newIsProtected);
    setNewTitle('');
    setNewIcon('📝');
    setNewIsProtected(false);
    setIsCreating(false);
  };

  const handleAddSnippet = (categoryId: string, isProtected: boolean) => {
    setEditingCategoryId(categoryId);
    setEditingIsProtected(isProtected);
    setIsSnippetEditorOpen(true);
  };

  const handleSaveSnippet = (command: Command) => {
    if (editingCategoryId) {
      onAddSnippet(editingCategoryId, command, editingIsProtected);
    }
    setIsSnippetEditorOpen(false);
    setEditingCategoryId(null);
  };

  const commonIcons = ['📝', '⭐', '🔧', '💼', '🎯', '🚀', '💡', '🔒', '🔑', '📌'];

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content category-manager">
          <div className="manager-header">
            <h2>Gerenciar Categorias</h2>
            <button onClick={onClose} className="close-btn">✕</button>
          </div>

          <div className="manager-body">
            {/* Criar nova categoria */}
            <div className="create-section">
              {!isCreating ? (
                <button onClick={() => setIsCreating(true)} className="btn-create">
                  ➕ Nova Categoria
                </button>
              ) : (
                <div className="create-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Ícone:</label>
                      <select value={newIcon} onChange={(e) => setNewIcon(e.target.value)}>
                        {commonIcons.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group flex-grow">
                      <label>Título:</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Ex: Meus Scripts"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newIsProtected}
                        onChange={(e) => setNewIsProtected(e.target.checked)}
                      />
                      <span>🔒 Categoria Protegida (requer senha)</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <button onClick={() => setIsCreating(false)} className="btn-cancel">
                      Cancelar
                    </button>
                    <button onClick={handleCreateCategory} className="btn-submit">
                      Criar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de categorias customizadas */}
            <div className="categories-list">
              <h3>Categorias Personalizadas</h3>
              {customCategories.length === 0 ? (
                <p className="empty-message">Nenhuma categoria personalizada ainda</p>
              ) : (
                customCategories.map((category) => (
                  <div key={category.id} className="category-item">
                    <div className="category-header">
                      <span className="category-title">
                        <span className="category-icon">{category.icon}</span>
                        {category.title}
                      </span>
                      <div className="category-actions">
                        <button
                          onClick={() => handleAddSnippet(category.id, false)}
                          className="btn-action"
                          title="Adicionar snippet"
                        >
                          ➕
                        </button>
                        <button
                          onClick={() => onDeleteCategory(category.id, false)}
                          className="btn-delete"
                          title="Excluir categoria"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="snippets-count">
                      {category.commands.length} snippet{category.commands.length !== 1 ? 's' : ''}
                    </div>
                    {category.commands.map((cmd, idx) => (
                      <div key={idx} className="snippet-item">
                        <div className="snippet-content">
                          <code>{cmd.command}</code>
                          <span className="snippet-desc">{cmd.description}</span>
                        </div>
                        <button
                          onClick={() => onDeleteSnippet(category.id, idx, false)}
                          className="btn-delete-small"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Lista de categorias protegidas */}
            <div className="categories-list">
              <h3>🔒 Categorias Protegidas</h3>
              {protectedCategories.length === 0 ? (
                <p className="empty-message">Nenhuma categoria protegida ainda</p>
              ) : (
                protectedCategories.map((category) => {
                  const commands = category.isLocked ? [] : getProtectedCommands(category.id);
                  return (
                    <div key={category.id} className="category-item protected">
                      <div className="category-header">
                        <span className="category-title">
                          <span className="category-icon">{category.icon}</span>
                          {category.title}
                          {category.isLocked && <span className="locked-badge">🔒 Bloqueado</span>}
                        </span>
                        <div className="category-actions">
                          {category.isLocked ? (
                            <button
                              onClick={() => onUnlockProtected(category.id)}
                              className="btn-action"
                              title="Desbloquear"
                            >
                              🔓
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddSnippet(category.id, true)}
                              className="btn-action"
                              title="Adicionar snippet"
                            >
                              ➕
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteCategory(category.id, true)}
                            className="btn-delete"
                            title="Excluir categoria"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="snippets-count">
                        {category.isLocked
                          ? 'Bloqueado - Digite a senha para ver'
                          : `${commands.length} snippet${commands.length !== 1 ? 's' : ''}`}
                      </div>
                      {!category.isLocked &&
                        commands.map((cmd, idx) => (
                          <div key={idx} className="snippet-item">
                            <div className="snippet-content">
                              <code>{cmd.command}</code>
                              <span className="snippet-desc">{cmd.description}</span>
                            </div>
                            <button
                              onClick={() => onDeleteSnippet(category.id, idx, true)}
                              className="btn-delete-small"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      <SnippetEditor
        isOpen={isSnippetEditorOpen}
        onClose={() => setIsSnippetEditorOpen(false)}
        onSave={handleSaveSnippet}
      />
    </>
  );
};
