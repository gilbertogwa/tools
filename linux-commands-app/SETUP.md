# 🔧 Setup e Configuração Adicional

## Criando Ícones para Windows

Para que a aplicação tenha ícones personalizados no Windows, você precisará criar os seguintes arquivos de ícone:

### 1. Ícone Principal da Aplicação (icon.ico)

1. Crie ou baixe uma imagem PNG de 256x256 pixels
2. Use um conversor online para converter para .ico:
   - https://convertio.co/png-ico/
   - https://www.icoconverter.com/
3. Salve como `assets/icon.ico`

### 2. Ícone do System Tray (tray-icon.png)

1. Crie uma imagem PNG de 16x16 ou 32x32 pixels
2. Use cores claras (será exibido na barra de tarefas)
3. Salve como `assets/tray-icon.png`

### Estrutura de Pastas para Assets

```
linux-commands-app/
├── assets/
│   ├── icon.ico          # Ícone principal (256x256)
│   ├── icon.png          # Versão PNG do ícone
│   └── tray-icon.png     # Ícone do system tray (16x16 ou 32x32)
```

## Instalação de Dependências

### Instalar todas as dependências

```bash
npm install
```

### Dependências Principais

- **electron**: ^28.0.0
- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-syntax-highlighter**: ^15.5.0

### DevDependencies

- **typescript**: ^5.3.0
- **vite**: ^5.0.0
- **@vitejs/plugin-react**: ^4.2.0
- **electron-builder**: ^24.9.1

## Configuração do Ambiente de Desenvolvimento

### Visual Studio Code (Recomendado)

Extensões recomendadas:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features

### Configuração do settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Build para Produção

### Build Completo

```bash
# 1. Build do React
npm run build

# 2. Build do Electron
npm run build:electron
```

Ou use o comando combinado:

```bash
npm run package
```

### Saída do Build

O executável será gerado em:
```
release/
├── linux-commands-app-Setup-1.0.0.exe  # Instalador Windows
└── win-unpacked/                        # Versão portável
```

## Executar em Desenvolvimento

### Modo de Desenvolvimento Normal

```bash
npm run dev
```

Isso iniciará:
1. Vite dev server em `http://localhost:5173`
2. Electron app conectando ao dev server

### Modo de Desenvolvimento com DevTools

O DevTools abre automaticamente em modo de desenvolvimento (veja `electron/main.ts`).

Para desabilitar, comente a linha:
```typescript
// mainWindow.webContents.openDevTools();
```

## Troubleshooting

### Porta 5173 em uso

Se a porta 5173 estiver em uso, edite `vite.config.ts`:

```typescript
export default defineConfig({
  // ...
  server: {
    port: 5174 // Mude para outra porta
  }
})
```

E atualize `electron/main.ts`:
```typescript
mainWindow.loadURL('http://localhost:5174'); // Nova porta
```

### Electron não inicia

1. Verifique se o Vite dev server está rodando
2. Aguarde alguns segundos após `npm run dev`
3. Verifique os logs no terminal

### Build falha no Windows

Certifique-se de ter:
- Node.js instalado corretamente
- Permissões de administrador se necessário
- Windows Build Tools instaladas (para módulos nativos)

```bash
npm install --global windows-build-tools
```

## Personalização Avançada

### Alterar Porta do Vite

`vite.config.ts`:
```typescript
server: {
  port: 3000
}
```

### Alterar Nome da Aplicação

`package.json`:
```json
{
  "name": "meu-app-comandos",
  "build": {
    "productName": "Meus Comandos Linux"
  }
}
```

### Adicionar mais Distribuições Linux

Edite `src/data/commands.ts` e adicione comandos específicos para outras distros.

## Performance

### Reduzir Tamanho do Bundle

1. Use imports dinâmicos quando possível
2. Remova dependências não utilizadas
3. Use tree-shaking do Vite

### Otimizar Tempo de Build

Em `vite.config.ts`:
```typescript
build: {
  minify: 'esbuild', // Mais rápido que terser
  sourcemap: false    // Desabilita sourcemaps em produção
}
```

## Segurança

### Context Isolation

A aplicação já está configurada com context isolation habilitado:

```typescript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  preload: path.join(__dirname, 'preload.js')
}
```

Isso previne que o código da web tenha acesso direto ao Node.js.

## Atualizações Futuras

### Auto-Update

Para adicionar auto-update, considere:
- electron-updater
- Configurar servidor de releases

### Distribuição

Opções de distribuição:
1. Microsoft Store
2. GitHub Releases
3. Website próprio
4. Chocolatey (gerenciador de pacotes Windows)

---

**Dúvidas?** Consulte a documentação oficial:
- [Electron Docs](https://www.electronjs.org/docs)
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
