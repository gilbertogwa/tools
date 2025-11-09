import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Command } from '../data/commands';
import './CommandCard.css';

interface CommandCardProps {
  command: Command;
}

function CommandCard({ command }: CommandCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="command-card">
      <div className="command-header">
        <p className="command-description">{command.description}</p>
        <button
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          title="Copiar comando"
        >
          {copied ? '✓' : '📋'}
        </button>
      </div>
      <div className="command-code">
        <SyntaxHighlighter
          language="bash"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '12px',
            borderRadius: '6px',
            fontSize: '13px',
            background: '#1a1a1a',
          }}
          codeTagProps={{
            style: {
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            },
          }}
        >
          {command.command}
        </SyntaxHighlighter>
      </div>
      {command.example && (
        <div className="command-example">
          <span className="example-label">Exemplo:</span>
          <code>{command.example}</code>
        </div>
      )}
    </div>
  );
}

export default CommandCard;
