# 🐧 Linux Commands - Guia Rápido Desktop

Aplicação desktop moderna para Windows com consulta rápida de comandos Linux. Interface elegante com tema dark, busca em tempo real e suporte a system tray.

![Platform](https://img.shields.io/badge/platform-Windows-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Características

- 🎨 **Interface Moderna**: Design dark theme elegante e responsivo
- 🔍 **Busca em Tempo Real**: Pesquise comandos instantaneamente
- 📁 **Categorias Organizadas**: Comandos organizados por categoria (Docker, SSH, Rede, etc.)
- 💻 **Syntax Highlighting**: Destaque de sintaxe para comandos bash
- 📋 **Copiar com Um Clique**: Copie comandos facilmente
- 🖥️ **System Tray**: Aplicação minimiza para a bandeja do sistema
- 📱 **Responsivo**: Interface se adapta a diferentes tamanhos de tela
- ⚡ **Performance**: Carregamento rápido e fluido

## 📚 Categorias de Comandos

- 📁 Manipulação de Arquivos e Pastas
- 🗜️ Arquivos Compactados
- 🐳 Docker
- 🌐 Rede e Conectividade
- 🔐 SSH e Transferência de Arquivos
- 👥 Usuários e Grupos
- 📦 Instalação de Pacotes
- 🔧 Comandos de Sistema
- 🔀 Git
- 📝 Manipulação de Texto
- 📊 Monitoramento e Performance
- 💡 Atalhos e Dicas

## 🚀 Instalação e Uso

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone ou baixe o repositório:
```bash
cd linux-commands-app
```

2. Instale as dependências:
```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

Isso iniciará:
- O servidor de desenvolvimento Vite (React)
- A aplicação Electron

### Build para Produção

```bash
npm run build
npm run build:electron
```

O executável será gerado na pasta `release/`.

## 🎮 Como Usar

### Busca de Comandos

1. Digite na barra de pesquisa qualquer palavra-chave (ex: "docker", "ssh", "arquivo")
2. Os resultados são filtrados em tempo real
3. Veja a contagem de resultados abaixo da barra de busca

### Filtrar por Categoria

1. Clique em qualquer categoria para ver apenas comandos daquela categoria
2. Clique em "Todos" para voltar a ver todas as categorias

### Copiar Comandos

1. Clique no ícone 📋 ao lado de qualquer comando
2. O comando é copiado automaticamente para a área de transferência
3. O ícone muda para ✓ confirmando a cópia

### System Tray

- **Minimizar**: Ao fechar a janela, a aplicação minimiza para o system tray
- **Restaurar**: Clique no ícone na bandeja para restaurar a janela
- **Menu**: Clique com botão direito no ícone para ver opções
- **Sair**: Use "Sair" no menu do tray para fechar completamente

## 🛠️ Tecnologias Utilizadas

- **Electron**: Framework para aplicações desktop
- **React**: Biblioteca UI
- **TypeScript**: Tipagem estática
- **Vite**: Build tool moderna e rápida
- **React Syntax Highlighter**: Destaque de sintaxe para código
- **CSS3**: Estilização moderna com variáveis CSS

## 📁 Estrutura do Projeto

```
linux-commands-app/
├── electron/              # Código Electron (processo principal)
│   ├── main.ts           # Janela principal e system tray
│   └── preload.ts        # Script de pré-carregamento
├── src/                  # Código React
│   ├── components/       # Componentes React
│   │   ├── CommandCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── CategoryFilter.tsx
│   ├── data/            # Dados dos comandos
│   │   └── commands.ts
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Entry point React
│   └── *.css            # Arquivos de estilo
├── assets/              # Ícones e recursos
├── dist/                # Build de produção
└── package.json         # Dependências e scripts
```

## 🎨 Personalização

### Adicionar Novos Comandos

Edite o arquivo `src/data/commands.ts`:

```typescript
{
  id: 'nova-categoria',
  title: 'Nova Categoria',
  icon: '🔥',
  commands: [
    {
      command: 'seu-comando',
      description: 'Descrição do comando',
      example: 'Exemplo de uso (opcional)'
    }
  ]
}
```

### Alterar Cores do Tema

Edite as variáveis CSS em `src/index.css`:

```css
:root {
  --bg-primary: #0a0a0a;
  --accent-primary: #00d9ff;
  /* ... outras variáveis */
}
```

## 🐛 Resolução de Problemas

### Erro ao instalar dependências
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Aplicação não abre
- Verifique se o Node.js está instalado corretamente
- Tente executar `npm run dev` para ver logs de erro

### Build falha
- Verifique se todas as dependências estão instaladas
- Execute `npm run build` primeiro, depois `npm run build:electron`

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia em modo desenvolvimento
- `npm run build` - Build da aplicação React
- `npm run build:electron` - Gera executável para Windows
- `npm run package` - Build completo (React + Electron)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:

1. Adicionar novos comandos
2. Melhorar a interface
3. Corrigir bugs
4. Sugerir novas funcionalidades

## 📄 Licença

MIT License - sinta-se livre para usar este projeto.

## 👤 Autor

**Gilbert**

---

**Criado para consulta rápida | Mantenha atualizado conforme sua necessidade** 🚀
