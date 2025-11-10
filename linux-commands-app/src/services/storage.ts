import { StorageData, DEFAULT_STORAGE_DATA } from '../types/custom-categories';

const STORAGE_KEY = 'linux-commands-app-data';

export class StorageService {
  /**
   * Salva dados no localStorage
   */
  static save(data: StorageData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /**
   * Carrega dados do localStorage
   */
  static load(): StorageData {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_STORAGE_DATA;
    }

    try {
      const parsed = JSON.parse(stored);
      // Merge com defaults para garantir que novos campos existam
      return {
        ...DEFAULT_STORAGE_DATA,
        ...parsed,
        settings: {
          ...DEFAULT_STORAGE_DATA.settings,
          ...(parsed.settings || {}),
        },
      };
    } catch (error) {
      console.error('Error loading storage:', error);
      return DEFAULT_STORAGE_DATA;
    }
  }

  /**
   * Limpa todos os dados
   */
  static clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
