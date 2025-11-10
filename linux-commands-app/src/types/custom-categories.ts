import { Command } from '../data/commands';

export interface CustomCategory {
  id: string;
  title: string;
  icon: string;
  commands: Command[];
  isProtected: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface StorageData {
  customCategories: CustomCategory[];
  protectedCategories: {
    id: string;
    title: string;
    icon: string;
    encryptedData: string; // JSON criptografado contendo commands
    createdAt: number;
    updatedAt: number;
  }[];
  masterPasswordHash: string | null;
  settings: {
    globalShortcut: string;
  };
}

export const DEFAULT_STORAGE_DATA: StorageData = {
  customCategories: [],
  protectedCategories: [],
  masterPasswordHash: null,
  settings: {
    globalShortcut: 'CommandOrControl+Shift+L',
  },
};
