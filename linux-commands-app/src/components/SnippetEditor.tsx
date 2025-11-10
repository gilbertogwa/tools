import React, { useState } from 'react';
import { Command } from '../data/commands';
import '../styles/SnippetEditor.css';

interface SnippetEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (command: Command) => void;
  editingCommand?: Command;
}

export const SnippetEditor: React.FC<SnippetEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  editingCommand,
}) => {
  const [command, setCommand] = useState(editingCommand?.command || '');
  const [description, setDescription] = useState(editingCommand?.description || '');
  const [example, setExample] = useState(editingCommand?.example || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!command.trim() || !description.trim()) {
      alert('Comando e descrição são obrigatórios');
      return;
    }

    onSave({
      command: command.trim(),
      description: description.trim(),
      example: example.trim() || undefined,
    });

    // Limpar form
    setCommand('');
    setDescription('');
    setExample('');
  };

  const handleCancel = () => {
    setCommand('');
    setDescription('');
    setExample('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content snippet-editor">
        <h2>{editingCommand ? 'Editar Snippet' : 'Novo Snippet'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="command">Comando: *</label>
            <input
              type="text"
              id="command"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Ex: ls -lah"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição: *</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Lista todos os arquivos com detalhes"
            />
          </div>

          <div className="form-group">
            <label htmlFor="example">Exemplo (opcional):</label>
            <textarea
              id="example"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Ex: Mostra arquivos ocultos e tamanhos legíveis"
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              {editingCommand ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
