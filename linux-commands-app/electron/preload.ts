import { contextBridge, ipcRenderer } from 'electron';

// Expor APIs seguras para o renderer
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,

  // Configurações
  setGlobalShortcut: (shortcut: string) => ipcRenderer.invoke('set-global-shortcut', shortcut),

  // Notificações
  onShortcutPressed: (callback: () => void) => {
    ipcRenderer.on('shortcut-pressed', callback);
  },

  // Controle da janela
  showWindow: () => ipcRenderer.send('show-window'),
  hideWindow: () => ipcRenderer.send('hide-window'),
});
