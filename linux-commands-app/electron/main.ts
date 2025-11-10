import { app, BrowserWindow, Tray, Menu, nativeImage, globalShortcut, ipcMain, Notification } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuitting = false;
let currentShortcut = 'CommandOrControl+Shift+L';

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: true,
    icon: path.join(__dirname, '../../assets/icon.png'),
    show: false
  });

  // Maximizar ao abrir
  mainWindow.maximize();
  mainWindow.show();

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Minimizar para system tray ao invés de fechar
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow?.hide();

      // Mostrar notificação quando minimizada
      if (Notification.isSupported()) {
        new Notification({
          title: 'Linux Commands',
          body: 'Aplicação minimizada para a bandeja do sistema. Use o atalho para abrir rapidamente.',
          icon: path.join(__dirname, '../../assets/icon.png'),
        }).show();
      }
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function registerGlobalShortcut() {
  // Desregistrar atalho anterior se existir
  globalShortcut.unregisterAll();

  // Registrar novo atalho
  const success = globalShortcut.register(currentShortcut, () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });

  if (!success) {
    console.error('Failed to register global shortcut');
  }
}

function createTray() {
  // Criar ícone para o tray (16x16 ou 32x32 para melhor qualidade)
  const iconPath = isDev
    ? path.join(__dirname, '../../assets/tray-icon.png')
    : path.join(process.resourcesPath, 'assets/tray-icon.png');

  // Criar um ícone simples se o arquivo não existir
  let icon = nativeImage.createFromPath(iconPath);

  // Se não encontrar o ícone, criar um padrão
  if (icon.isEmpty()) {
    // Criar um ícone simples 16x16 com base64
    const iconBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFJSURBVDiNpdMxS8NAGMbx/3tJLhcaHRQcRBBXwUVwFBwUv4CgODg4CA6Cg4ODn8DBQXBwcBBE0EFw0EUQRHRwEARBEATBQXAQFKGQJpfLdUgTY2KiD9zyvnD/e+DuuBcAACmlACCE+HcAKaW0LEu3bfumVCrNer3eFkKMAQCA53k7juNsR1H0AAAQhuF6sVgcsCxr3jTNMQCAruuXQRAcAACEYXhaLBZHVVWdNU1zBABACKmZpnmmaZqu6/qGaZojuq5fNhqNPgCAaZpj27aP4zh+VxTlWNO0Kdu2z1utVh8AQFXVSV3XryqVytputydVVZ1otVp9AABVVZ/jOH5TVfWl0+lMKIpyoSjKi+M4j6qqvgEAtFqtvjiO3wAAWq3Wu6IoL51OZ0JRlAtN0yZt2z6O4/jDsqyuoihn7Xb7UlXVyTabzf4CAAD8ABM6g9rGnJEJAAAAAElFTkSuQmCC';
    icon = nativeImage.createFromDataURL(iconBase64);
  }

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar',
      click: () => {
        mainWindow?.show();
        mainWindow?.maximize();
      }
    },
    {
      label: 'Ocultar',
      click: () => {
        mainWindow?.hide();
      }
    },
    { type: 'separator' },
    {
      label: 'Sair',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Linux Commands - Guia Rápido');
  tray.setContextMenu(contextMenu);

  // Clique no ícone do tray mostra/esconde a janela
  tray.on('click', () => {
    if (mainWindow?.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow?.show();
      mainWindow?.maximize();
    }
  });
}

// IPC Handlers
ipcMain.handle('set-global-shortcut', async (_event, shortcut: string) => {
  currentShortcut = shortcut;
  registerGlobalShortcut();
  return { success: true };
});

ipcMain.on('show-window', () => {
  mainWindow?.show();
  mainWindow?.focus();
});

ipcMain.on('hide-window', () => {
  mainWindow?.hide();
});

app.whenReady().then(() => {
  createWindow();
  createTray();
  registerGlobalShortcut();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // No Windows, não fechar o app quando todas as janelas forem fechadas
  // pois o app fica rodando no system tray
  if (process.platform !== 'win32') {
    app.quit();
  }
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('will-quit', () => {
  // Desregistrar todos os atalhos globais ao sair
  globalShortcut.unregisterAll();
});
