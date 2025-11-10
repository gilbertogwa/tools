import { useState, useMemo, useEffect, useCallback } from 'react';
import { commandsData, Command, CommandCategory } from './data/commands';
import { CustomCategory, StorageData } from './types/custom-categories';
import { StorageService } from './services/storage';
import { CryptoService } from './services/crypto';
import CommandCard from './components/CommandCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import { PasswordModal } from './components/PasswordModal';
import { CategoryManager } from './components/CategoryManager';
import { Settings } from './components/Settings';
import './App.css';

const INACTIVITY_TIMEOUT = 20000; // 20 segundos

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Estados de armazenamento
  const [storageData, setStorageData] = useState<StorageData>(StorageService.load());
  const [unlockedProtectedIds, setUnlockedProtectedIds] = useState<Set<string>>(new Set());

  // Estados de modais
  const [passwordModal, setPasswordModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isCreating: boolean;
    onSuccess: (password: string) => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    isCreating: false,
    onSuccess: () => {},
  });
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Timer de inatividade
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Resetar timer de inatividade
  const resetActivityTimer = useCallback(() => {
    setLastActivityTime(Date.now());
  }, []);

  // Monitora inatividade e bloqueia categorias protegidas
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivityTime > INACTIVITY_TIMEOUT) {
        // Bloquear todas as categorias protegidas
        setUnlockedProtectedIds(new Set());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivityTime]);

  // Eventos de atividade
  useEffect(() => {
    const handleActivity = () => resetActivityTimer();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [resetActivityTimer]);

  // Salvar dados quando houver mudanças
  useEffect(() => {
    StorageService.save(storageData);
  }, [storageData]);

  // Criar Senha Mestra
  const handleCreateMasterPassword = (password: string) => {
    const hash = CryptoService.hashPassword(password);
    setStorageData((prev) => ({
      ...prev,
      masterPasswordHash: hash,
    }));
    setPasswordModal({ ...passwordModal, isOpen: false });
  };

  // Verificar Senha Mestra
  const handleVerifyMasterPassword = (password: string, onSuccess: () => void) => {
    if (storageData.masterPasswordHash && CryptoService.verifyPassword(password, storageData.masterPasswordHash)) {
      onSuccess();
      setPasswordModal({ ...passwordModal, isOpen: false });
    } else {
      alert('Senha incorreta!');
    }
  };

  // Criar Categoria
  const handleCreateCategory = (title: string, icon: string, isProtected: boolean) => {
    if (isProtected && !storageData.masterPasswordHash) {
      // Precisa criar senha mestra primeiro
      setPasswordModal({
        isOpen: true,
        title: 'Criar Senha Mestra',
        message: 'Defina uma senha mestra para proteger categorias sensíveis. Esta senha será usada para todas as categorias protegidas.',
        isCreating: true,
        onSuccess: (password) => {
          handleCreateMasterPassword(password);
          // Criar categoria após criar senha
          createCategory(title, icon, isProtected);
        },
      });
    } else {
      createCategory(title, icon, isProtected);
    }
  };

  const createCategory = (title: string, icon: string, isProtected: boolean) => {
    const newCategory: CustomCategory = {
      id: `custom-${Date.now()}`,
      title,
      icon,
      commands: [],
      isProtected,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (isProtected) {
      setStorageData((prev) => ({
        ...prev,
        protectedCategories: [
          ...prev.protectedCategories,
          {
            id: newCategory.id,
            title: newCategory.title,
            icon: newCategory.icon,
            encryptedData: '',
            createdAt: newCategory.createdAt,
            updatedAt: newCategory.updatedAt,
          },
        ],
      }));
    } else {
      setStorageData((prev) => ({
        ...prev,
        customCategories: [...prev.customCategories, newCategory],
      }));
    }
  };

  // Deletar Categoria
  const handleDeleteCategory = (categoryId: string, isProtected: boolean) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.')) {
      return;
    }

    if (isProtected) {
      setStorageData((prev) => ({
        ...prev,
        protectedCategories: prev.protectedCategories.filter((c) => c.id !== categoryId),
      }));
      setUnlockedProtectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
    } else {
      setStorageData((prev) => ({
        ...prev,
        customCategories: prev.customCategories.filter((c) => c.id !== categoryId),
      }));
    }
  };

  // Adicionar Snippet
  const handleAddSnippet = (categoryId: string, command: Command, isProtected: boolean) => {
    resetActivityTimer();

    if (isProtected) {
      if (!unlockedProtectedIds.has(categoryId)) {
        alert('Categoria está bloqueada. Desbloqueie primeiro.');
        return;
      }

      const category = storageData.protectedCategories.find((c) => c.id === categoryId);
      if (!category || !storageData.masterPasswordHash) return;

      // Descriptografar, adicionar e criptografar novamente
      let commands: Command[] = [];
      if (category.encryptedData) {
        const decrypted = CryptoService.decrypt(category.encryptedData, storageData.masterPasswordHash);
        if (decrypted) {
          commands = JSON.parse(decrypted);
        }
      }

      commands.push(command);

      const encrypted = CryptoService.encrypt(JSON.stringify(commands), storageData.masterPasswordHash);

      setStorageData((prev) => ({
        ...prev,
        protectedCategories: prev.protectedCategories.map((c) =>
          c.id === categoryId
            ? { ...c, encryptedData: encrypted, updatedAt: Date.now() }
            : c
        ),
      }));
    } else {
      setStorageData((prev) => ({
        ...prev,
        customCategories: prev.customCategories.map((c) =>
          c.id === categoryId
            ? { ...c, commands: [...c.commands, command], updatedAt: Date.now() }
            : c
        ),
      }));
    }
  };

  // Deletar Snippet
  const handleDeleteSnippet = (categoryId: string, commandIndex: number, isProtected: boolean) => {
    resetActivityTimer();

    if (!confirm('Tem certeza que deseja excluir este snippet?')) {
      return;
    }

    if (isProtected) {
      if (!unlockedProtectedIds.has(categoryId)) {
        alert('Categoria está bloqueada. Desbloqueie primeiro.');
        return;
      }

      const category = storageData.protectedCategories.find((c) => c.id === categoryId);
      if (!category || !storageData.masterPasswordHash) return;

      let commands: Command[] = [];
      if (category.encryptedData) {
        const decrypted = CryptoService.decrypt(category.encryptedData, storageData.masterPasswordHash);
        if (decrypted) {
          commands = JSON.parse(decrypted);
        }
      }

      commands.splice(commandIndex, 1);

      const encrypted = CryptoService.encrypt(JSON.stringify(commands), storageData.masterPasswordHash);

      setStorageData((prev) => ({
        ...prev,
        protectedCategories: prev.protectedCategories.map((c) =>
          c.id === categoryId
            ? { ...c, encryptedData: encrypted, updatedAt: Date.now() }
            : c
        ),
      }));
    } else {
      setStorageData((prev) => ({
        ...prev,
        customCategories: prev.customCategories.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                commands: c.commands.filter((_, idx) => idx !== commandIndex),
                updatedAt: Date.now(),
              }
            : c
        ),
      }));
    }
  };

  // Desbloquear Categoria Protegida
  const handleUnlockProtected = (categoryId: string) => {
    if (!storageData.masterPasswordHash) return;

    setPasswordModal({
      isOpen: true,
      title: 'Desbloquear Categoria',
      message: 'Digite a senha mestra para acessar esta categoria protegida.',
      isCreating: false,
      onSuccess: (password) => {
        handleVerifyMasterPassword(password, () => {
          setUnlockedProtectedIds((prev) => new Set(prev).add(categoryId));
          resetActivityTimer();
        });
      },
    });
  };

  // Obter comandos de categoria protegida
  const getProtectedCommands = (categoryId: string): Command[] => {
    if (!unlockedProtectedIds.has(categoryId)) return [];

    const category = storageData.protectedCategories.find((c) => c.id === categoryId);
    if (!category || !storageData.masterPasswordHash) return [];

    if (!category.encryptedData) return [];

    const decrypted = CryptoService.decrypt(category.encryptedData, storageData.masterPasswordHash);
    if (!decrypted) return [];

    try {
      return JSON.parse(decrypted);
    } catch {
      return [];
    }
  };

  // Salvar atalho global
  const handleSaveShortcut = (shortcut: string) => {
    setStorageData((prev) => ({
      ...prev,
      settings: { ...prev.settings, globalShortcut: shortcut },
    }));

    // Comunicar com Electron se disponível
    if (window.electronAPI) {
      window.electronAPI.setGlobalShortcut(shortcut);
    }
  };

  // Alterar senha mestra
  const handleChangeMasterPassword = () => {
    if (storageData.masterPasswordHash) {
      // Verificar senha antiga primeiro
      setPasswordModal({
        isOpen: true,
        title: 'Verificar Senha Atual',
        message: 'Digite sua senha mestra atual para continuar.',
        isCreating: false,
        onSuccess: (password) => {
          handleVerifyMasterPassword(password, () => {
            // Pedir nova senha
            setPasswordModal({
              isOpen: true,
              title: 'Nova Senha Mestra',
              message: 'Defina a nova senha mestra. ATENÇÃO: Você precisará re-inserir os dados das categorias protegidas.',
              isCreating: true,
              onSuccess: (newPassword) => {
                handleCreateMasterPassword(newPassword);
                // Limpar categorias protegidas
                setStorageData((prev) => ({
                  ...prev,
                  protectedCategories: [],
                }));
                setUnlockedProtectedIds(new Set());
                alert('Senha alterada! Suas categorias protegidas foram removidas.');
              },
            });
          });
        },
      });
    } else {
      setPasswordModal({
        isOpen: true,
        title: 'Criar Senha Mestra',
        message: 'Defina uma senha mestra para proteger categorias sensíveis.',
        isCreating: true,
        onSuccess: handleCreateMasterPassword,
      });
    }
  };

  // Combinar categorias padrão com personalizadas
  const allCategories = useMemo((): CommandCategory[] => {
    const custom: CommandCategory[] = storageData.customCategories.map((c) => ({
      id: c.id,
      title: c.title,
      icon: c.icon,
      commands: c.commands,
    }));

    const protectedCats: CommandCategory[] = storageData.protectedCategories.map((c) => ({
      id: c.id,
      title: c.title,
      icon: c.icon,
      commands: unlockedProtectedIds.has(c.id) ? getProtectedCommands(c.id) : [],
    }));

    return [...commandsData, ...custom, ...protectedCats];
  }, [storageData, unlockedProtectedIds]);

  // Filtrar comandos baseado na busca e categoria
  const filteredData = useMemo(() => {
    let data = allCategories;

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
  }, [searchTerm, selectedCategory, allCategories]);

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
          <p className="app-description">AlmaLinux | CentOS | Ubuntu</p>
        </div>
        <div className="header-actions">
          <button onClick={() => setIsCategoryManagerOpen(true)} className="header-btn" title="Gerenciar Categorias">
            📁 Categorias
          </button>
          <button onClick={() => setIsSettingsOpen(true)} className="header-btn" title="Configurações">
            ⚙️
          </button>
        </div>
      </header>

      <div className="controls-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} totalResults={totalCommands} />
        <CategoryFilter categories={allCategories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </div>

      <main className="app-main">
        {filteredData.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h2>Nenhum comando encontrado</h2>
            <p>Tente ajustar sua busca ou selecionar outra categoria</p>
          </div>
        ) : (
          <div className="categories-container">
            {filteredData.map((category) => {
              const isProtected = storageData.protectedCategories.some((c) => c.id === category.id);
              const isLocked = isProtected && !unlockedProtectedIds.has(category.id);

              return (
                <section key={category.id} className={`category-section ${isProtected ? 'protected' : ''}`}>
                  <h2 className="category-title">
                    <span className="category-icon">{category.icon}</span>
                    {category.title}
                    {isLocked && <span className="locked-badge">🔒 Bloqueado</span>}
                    <span className="category-count">
                      {category.commands.length} comando{category.commands.length !== 1 ? 's' : ''}
                    </span>
                  </h2>
                  {isLocked ? (
                    <div className="locked-category">
                      <p>Esta categoria está bloqueada por inatividade.</p>
                      <button onClick={() => handleUnlockProtected(category.id)} className="btn-unlock">
                        🔓 Desbloquear
                      </button>
                    </div>
                  ) : (
                    <div className="commands-grid">
                      {category.commands.map((command, index) => (
                        <CommandCard key={`${category.id}-${index}`} command={command} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Criado para consulta rápida | Mantenha atualizado conforme sua necessidade</p>
      </footer>

      {/* Modais */}
      <PasswordModal
        isOpen={passwordModal.isOpen}
        title={passwordModal.title}
        message={passwordModal.message}
        isCreating={passwordModal.isCreating}
        onSubmit={passwordModal.onSuccess}
        onCancel={() => setPasswordModal({ ...passwordModal, isOpen: false })}
      />

      <CategoryManager
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        customCategories={storageData.customCategories}
        protectedCategories={storageData.protectedCategories.map((c) => ({
          ...c,
          isLocked: !unlockedProtectedIds.has(c.id),
        }))}
        onCreateCategory={handleCreateCategory}
        onDeleteCategory={handleDeleteCategory}
        onAddSnippet={handleAddSnippet}
        onDeleteSnippet={handleDeleteSnippet}
        onUnlockProtected={handleUnlockProtected}
        getProtectedCommands={getProtectedCommands}
      />

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentShortcut={storageData.settings.globalShortcut}
        onSaveShortcut={handleSaveShortcut}
        hasMasterPassword={!!storageData.masterPasswordHash}
        onChangeMasterPassword={handleChangeMasterPassword}
      />
    </div>
  );
}

export default App;
