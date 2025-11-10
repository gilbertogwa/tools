import React, { useState } from 'react';
import '../styles/PasswordModal.css';

interface PasswordModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onSubmit: (password: string) => void;
  onCancel: () => void;
  isCreating?: boolean;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  title,
  message,
  onSubmit,
  onCancel,
  isCreating = false,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Senha é obrigatória');
      return;
    }

    if (isCreating) {
      if (password.length < 6) {
        setError('Senha deve ter no mínimo 6 caracteres');
        return;
      }
      if (password !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }
    }

    onSubmit(password);
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleCancel = () => {
    setPassword('');
    setConfirmPassword('');
    setError('');
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              placeholder={isCreating ? 'Mínimo 6 caracteres' : 'Digite sua senha'}
            />
          </div>

          {isCreating && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite a senha novamente"
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              {isCreating ? 'Criar' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
