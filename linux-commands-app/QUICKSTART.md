# 🚀 Guia de Início Rápido

## ✅ Erros Corrigidos

Os seguintes problemas foram corrigidos:

1. ✅ Removidos imports não utilizados no `App.tsx`
2. ✅ Adicionado script para compilar TypeScript do Electron
3. ✅ Configurado `tsconfig.node.json` para CommonJS (compatível com Electron)
4. ✅ Adicionadas declarações de tipo necessárias

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- ✅ **Node.js 18+** ([Download aqui](https://nodejs.org/))
- ✅ **npm** (vem junto com Node.js)

Para verificar se estão instalados:

```bash
node --version    # Deve mostrar v18.x.x ou superior
npm --version     # Deve mostrar uma versão
```

## 🔧 Instalação (Primeira vez)

### Passo 1: Entre na pasta do projeto

```bash
cd linux-commands-app
```

### Passo 2: Instale as dependências

```bash
npm install
```

**Aguarde:** Isso pode levar alguns minutos na primeira vez. O npm vai baixar todas as dependências necessárias.

Você verá algo como:
```
added 500 packages in 2m
```

## ▶️ Executar a Aplicação

### Modo Desenvolvimento (Recomendado para testar)

```bash
npm run dev
```

**O que acontece:**
1. Compila o TypeScript do Electron
2. Inicia o servidor de desenvolvimento Vite (React)
3. Abre a aplicação Electron automaticamente

**Aguarde 10-15 segundos** na primeira execução. Você verá:

```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

Em seguida, a janela da aplicação abrirá automaticamente!

### Se der erro na primeira vez

Às vezes o Electron tenta abrir antes do Vite estar pronto. Se isso acontecer:

1. Pressione `Ctrl+C` para parar
2. Execute novamente: `npm run dev`

## 📦 Gerar Executável (Para distribuição)

### Passo 1: Build completo

```bash
npm run package
```

**O que acontece:**
1. Compila o TypeScript do Electron
2. Faz build otimizado do React (Vite)
3. Gera o executável Windows com electron-builder

**Tempo estimado:** 2-5 minutos

### Passo 2: Encontre o executável

O executável estará em:

```
linux-commands-app/
└── release/
    ├── Linux Commands Setup 1.0.0.exe    # 👈 Instalador
    └── win-unpacked/                     # 👈 Versão portável
        └── Linux Commands.exe
```

## 🎯 Uso da Aplicação

### Recursos Principais

1. **🔍 Busca em Tempo Real**
   - Digite na barra de pesquisa
   - Veja resultados instantâneos
   - Busca por comando ou descrição

2. **📁 Filtro por Categoria**
   - Clique em qualquer categoria
   - Veja apenas comandos daquela categoria
   - Clique em "Todos" para ver tudo

3. **📋 Copiar Comandos**
   - Clique no ícone 📋 ao lado do comando
   - Comando copiado automaticamente!
   - Ícone muda para ✓ confirmando

4. **🖥️ System Tray**
   - Fechar janela = minimiza para bandeja
   - Clique no ícone na bandeja = restaura janela
   - Botão direito no ícone = menu
   - Use "Sair" para fechar completamente

### Atalhos

- `Ctrl + F` - Focar na busca (se implementado)
- `ESC` - Limpar busca (se implementado)

## 🐛 Solução de Problemas

### Erro: "unable to find electron app"

**Solução:**
```bash
# Limpe e reinstale
rm -rf node_modules dist
npm install
npm run dev
```

### Erro: "Port 5173 already in use"

**Solução:**

1. Pare qualquer outro processo usando a porta
2. Ou mude a porta em `vite.config.ts`:

```typescript
server: {
  port: 5174  // ou outra porta
}
```

### Erro: Dependências não instaladas

**Solução:**
```bash
npm install --force
```

### Aplicação não abre

**Verifique:**
1. Node.js está instalado? `node --version`
2. Dependências instaladas? `ls node_modules` (deve ter muitas pastas)
3. Olhe os erros no terminal

### Build falha

**Solução:**
```bash
# Tente build por partes
npm run build:electron-ts   # Compila Electron
npm run build               # Build completo
npm run build:electron      # Gera executável
```

## 📁 Estrutura de Arquivos

```
linux-commands-app/
├── electron/              # Código Electron (Desktop)
│   ├── main.ts           # Janela principal + tray
│   └── preload.ts        # Segurança
├── src/                  # Código React (Interface)
│   ├── components/       # Componentes visuais
│   ├── data/            # Dados dos comandos
│   │   └── commands.ts   # 👈 Edite aqui para adicionar comandos
│   └── App.tsx          # Componente principal
├── dist/                 # Arquivos compilados (gerado)
├── release/             # Executáveis (gerado)
├── node_modules/        # Dependências (gerado)
└── package.json         # Configurações do projeto
```

## ✏️ Personalização

### Adicionar Novos Comandos

Edite: `src/data/commands.ts`

```typescript
{
  id: 'minha-categoria',
  title: 'Minha Categoria',
  icon: '🔥',
  commands: [
    {
      command: 'meu-comando',
      description: 'Descrição do comando',
    }
  ]
}
```

Depois:
```bash
npm run dev  # Veja as mudanças ao vivo
```

### Mudar Cores

Edite: `src/index.css`

```css
:root {
  --accent-primary: #ff0000;  /* Mude para vermelho */
  --bg-primary: #ffffff;      /* Fundo branco */
  /* ... outras cores */
}
```

## 🔄 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia em desenvolvimento |
| `npm run build` | Build de produção |
| `npm run build:electron-ts` | Compila TypeScript Electron |
| `npm run build:electron` | Gera executável |
| `npm run package` | Build completo (tudo) |

## 📞 Ajuda

Se continuar com problemas:

1. **Verifique versões:**
   ```bash
   node --version   # Deve ser 18+
   npm --version
   ```

2. **Limpe tudo e reinstale:**
   ```bash
   rm -rf node_modules dist release
   npm install
   npm run dev
   ```

3. **Verifique logs de erro** no terminal

## 🎉 Pronto!

Agora você pode:

1. ✅ Executar a aplicação: `npm run dev`
2. ✅ Gerar executável: `npm run package`
3. ✅ Personalizar comandos: Edite `src/data/commands.ts`
4. ✅ Distribuir: Compartilhe o arquivo em `release/`

**Enjoy! 🐧**
