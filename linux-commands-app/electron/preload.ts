import { contextBridge } from 'electron';

// Expor APIs seguras para o renderer se necessário
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform
});
