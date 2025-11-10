export interface ElectronAPI {
  platform: string;
  setGlobalShortcut: (shortcut: string) => Promise<{ success: boolean }>;
  onShortcutPressed: (callback: () => void) => void;
  showWindow: () => void;
  hideWindow: () => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
