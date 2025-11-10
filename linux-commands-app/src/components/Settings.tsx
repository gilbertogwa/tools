import React, { useState } from 'react';
import '../styles/Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentShortcut: string;
  onSaveShortcut: (shortcut: string) => void;
  hasMasterPassword: boolean;
  onChangeMasterPassword: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
  currentShortcut,
  onSaveShortcut,
  hasMasterPassword,
  onChangeMasterPassword,
}) => {
  const [shortcut, setShortcut] = useState(currentShortcut);
  const [recording, setRecording] = useState(false);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!recording) return;

    e.preventDefault();

    const parts: string[] = [];
    if (e.ctrlKey || e.metaKey) parts.push(e.ctrlKey ? 'Control' : 'Command');
    if (e.altKey) parts.push('Alt');
    if (e.shiftKey) parts.push('Shift');

    // Adicionar a tecla principal (se não for modificadora)
    if (!['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) {
      parts.push(e.key.toUpperCase());
    }

    if (parts.length >= 2) {
      const newShortcut = parts.join('+').replace('Command', 'CommandOrControl');
      setShortcut(newShortcut);
      setRecording(false);
    }
  };

  const handleSave = () => {
    onSaveShortcut(shortcut);
    onClose();
  };

  const commonShortcuts = [
    { label: 'Ctrl+Shift+L', value: 'CommandOrControl+Shift+L' },
    { label: 'Ctrl+Shift+K', value: 'CommandOrControl+Shift+K' },
    { label: 'Ctrl+Alt+L', value: 'CommandOrControl+Alt+L' },
    { label: 'Ctrl+Alt+K', value: 'CommandOrControl+Alt+K' },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content settings-modal">
        <div className="manager-header">
          <h2>⚙️ Configurações</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="settings-body">
          {/* Atalho Global */}
          <div className="setting-section">
            <h3>Atalho Global</h3>
            <p className="setting-description">
              Defina um atalho de teclado para abrir/fechar a aplicação de qualquer lugar
            </p>

            <div className="shortcut-input-group">
              <input
                type="text"
                value={shortcut}
                readOnly
                className="shortcut-display"
                placeholder="Pressione 'Gravar' e digite o atalho"
              />
              <button
                onClick={() => setRecording(!recording)}
                className={`btn-record ${recording ? 'recording' : ''}`}
                onKeyDown={handleKeyDown}
              >
                {recording ? '⏺️ Gravando...' : '🎹 Gravar'}
              </button>
            </div>

            {recording && (
              <div className="recording-hint">
                Pressione uma combinação de teclas (ex: Ctrl+Shift+L)
              </div>
            )}

            <div className="shortcut-presets">
              <span>Atalhos comuns:</span>
              {commonShortcuts.map((sc) => (
                <button
                  key={sc.value}
                  onClick={() => setShortcut(sc.value)}
                  className="btn-preset"
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Senha Mestra */}
          <div className="setting-section">
            <h3>🔒 Senha Mestra</h3>
            <p className="setting-description">
              {hasMasterPassword
                ? 'Senha mestra configurada para categorias protegidas'
                : 'Nenhuma senha mestra configurada'}
            </p>

            <button onClick={onChangeMasterPassword} className="btn-change-password">
              {hasMasterPassword ? 'Alterar Senha Mestra' : 'Definir Senha Mestra'}
            </button>
          </div>

          {/* Info */}
          <div className="setting-section info-section">
            <h3>ℹ️ Informações</h3>
            <div className="info-item">
              <strong>Versão:</strong> 1.0.0
            </div>
            <div className="info-item">
              <strong>Timeout de Inatividade:</strong> 20 segundos
            </div>
            <div className="info-item">
              <strong>Categorias Protegidas:</strong> Bloqueiam automaticamente após inatividade
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
          <button onClick={handleSave} className="btn-submit">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
