export interface Command {
  command: string;
  description: string;
  example?: string;
}

export interface CommandCategory {
  id: string;
  title: string;
  icon: string;
  commands: Command[];
}

export const commandsData: CommandCategory[] = [
  {
    id: 'files',
    title: 'Manipulação de Arquivos e Pastas',
    icon: '📁',
    commands: [
      {
        command: 'pwd',
        description: 'Mostra diretório atual',
      },
      {
        command: 'ls -lah',
        description: 'Lista tudo (incluindo ocultos) com detalhes',
      },
      {
        command: 'ls -lhS',
        description: 'Lista ordenado por tamanho',
      },
      {
        command: 'ls -lht',
        description: 'Lista ordenado por data',
      },
      {
        command: 'tree -L 2',
        description: 'Árvore de diretórios (2 níveis)',
      },
      {
        command: 'cd -',
        description: 'Volta para diretório anterior',
      },
      {
        command: 'mkdir -p pasta/subpasta',
        description: 'Cria diretórios recursivamente',
      },
      {
        command: 'touch arquivo.txt',
        description: 'Cria arquivo vazio',
      },
      {
        command: 'rm -rf pasta/',
        description: 'Remove pasta e conteúdo (cuidado!)',
      },
      {
        command: 'rm -i arquivo.txt',
        description: 'Remove com confirmação',
      },
      {
        command: 'find . -name "*.log" -delete',
        description: 'Remove arquivos por padrão',
      },
      {
        command: 'cp -r origem/ destino/',
        description: 'Copia pasta recursivamente',
      },
      {
        command: 'cp -p arquivo.txt backup.txt',
        description: 'Copia preservando permissões',
      },
      {
        command: 'mv arquivo.txt /novo/local/',
        description: 'Move arquivo',
      },
      {
        command: 'mv antigo.txt novo.txt',
        description: 'Renomeia arquivo',
      },
      {
        command: 'rsync -avz origem/ destino/',
        description: 'Sincroniza pastas (melhor que cp)',
      },
      {
        command: 'find /var -name "*.log"',
        description: 'Busca por nome',
      },
      {
        command: 'find . -type f -size +100M',
        description: 'Arquivos maiores que 100MB',
      },
      {
        command: 'find . -mtime -7',
        description: 'Modificados últimos 7 dias',
      },
      {
        command: 'locate arquivo.txt',
        description: 'Busca rápida (precisa updatedb)',
      },
      {
        command: 'which docker',
        description: 'Localiza executável no PATH',
      },
      {
        command: 'whereis python',
        description: 'Mostra localização de binário',
      },
      {
        command: 'cat arquivo.txt',
        description: 'Mostra conteúdo completo',
      },
      {
        command: 'less arquivo.txt',
        description: 'Visualiza com paginação',
      },
      {
        command: 'head -n 20 arquivo.log',
        description: 'Primeiras 20 linhas',
      },
      {
        command: 'tail -n 50 arquivo.log',
        description: 'Últimas 50 linhas',
      },
      {
        command: 'tail -f /var/log/app.log',
        description: 'Monitora arquivo em tempo real',
      },
      {
        command: 'grep "erro" arquivo.log',
        description: 'Busca texto em arquivo',
      },
      {
        command: 'grep -r "erro" /var/log/',
        description: 'Busca recursiva em diretórios',
      },
      {
        command: 'grep -i "erro" app.log',
        description: 'Busca case-insensitive',
      },
      {
        command: 'chmod 755 script.sh',
        description: 'rwxr-xr-x (executável)',
      },
      {
        command: 'chmod 644 arquivo.txt',
        description: 'rw-r--r-- (leitura)',
      },
      {
        command: 'chmod +x script.sh',
        description: 'Adiciona permissão de execução',
      },
      {
        command: 'chown usuario:grupo arquivo',
        description: 'Muda dono e grupo',
      },
      {
        command: 'chown -R www-data:www-data /var/www/',
        description: 'Recursivo',
      },
    ],
  },
  {
    id: 'compression',
    title: 'Arquivos Compactados',
    icon: '🗜️',
    commands: [
      {
        command: 'tar -czf arquivo.tar.gz pasta/',
        description: 'Compacta com gzip',
      },
      {
        command: 'tar -cjf arquivo.tar.bz2 pasta/',
        description: 'Compacta com bzip2',
      },
      {
        command: 'tar -czf backup.tar.gz --exclude="*.log" pasta/',
        description: 'Exclui padrão',
      },
      {
        command: 'tar -xzf arquivo.tar.gz',
        description: 'Extrai .tar.gz',
      },
      {
        command: 'tar -xzf arquivo.tar.gz -C /destino/',
        description: 'Extrai em local específico',
      },
      {
        command: 'tar -xjf arquivo.tar.bz2',
        description: 'Extrai .tar.bz2',
      },
      {
        command: 'tar -tzf arquivo.tar.gz',
        description: 'Lista sem extrair',
      },
      {
        command: 'zip -r arquivo.zip pasta/',
        description: 'Compacta pasta',
      },
      {
        command: 'unzip arquivo.zip',
        description: 'Extrai',
      },
      {
        command: 'unzip -l arquivo.zip',
        description: 'Lista conteúdo',
      },
      {
        command: 'unzip arquivo.zip -d /destino/',
        description: 'Extrai em local específico',
      },
      {
        command: 'gzip arquivo.txt',
        description: 'Compacta (cria arquivo.txt.gz)',
      },
      {
        command: 'gzip -d arquivo.txt.gz',
        description: 'Descompacta',
      },
      {
        command: 'gunzip arquivo.txt.gz',
        description: 'Descompacta (alternativa)',
      },
      {
        command: 'bzip2 arquivo.txt',
        description: 'Compacta com bzip2',
      },
      {
        command: 'bunzip2 arquivo.txt.bz2',
        description: 'Descompacta bzip2',
      },
    ],
  },
  {
    id: 'docker',
    title: 'Docker',
    icon: '🐳',
    commands: [
      {
        command: 'docker ps',
        description: 'Lista containers rodando',
      },
      {
        command: 'docker ps -a',
        description: 'Lista todos (incluindo parados)',
      },
      {
        command: 'docker run -d --name meuapp imagem',
        description: 'Cria e inicia container',
      },
      {
        command: 'docker run -it ubuntu bash',
        description: 'Inicia container interativo',
      },
      {
        command: 'docker start container_id',
        description: 'Inicia container parado',
      },
      {
        command: 'docker stop container_id',
        description: 'Para container',
      },
      {
        command: 'docker restart container_id',
        description: 'Reinicia container',
      },
      {
        command: 'docker rm container_id',
        description: 'Remove container',
      },
      {
        command: 'docker rm -f $(docker ps -aq)',
        description: 'Remove todos containers',
      },
      {
        command: 'docker logs -f container_id',
        description: 'Mostra logs em tempo real',
      },
      {
        command: 'docker exec -it container_id bash',
        description: 'Acessa bash do container',
      },
      {
        command: 'docker cp arquivo.txt container_id:/app/',
        description: 'Copia para container',
      },
      {
        command: 'docker stats',
        description: 'Mostra uso de recursos',
      },
      {
        command: 'docker images',
        description: 'Lista imagens locais',
      },
      {
        command: 'docker pull ubuntu:22.04',
        description: 'Baixa imagem',
      },
      {
        command: 'docker build -t minha-imagem:1.0 .',
        description: 'Constrói imagem',
      },
      {
        command: 'docker rmi imagem_id',
        description: 'Remove imagem',
      },
      {
        command: 'docker image prune -a',
        description: 'Remove imagens não usadas',
      },
      {
        command: 'docker tag imagem:tag registry/imagem:tag',
        description: 'Renomeia imagem',
      },
      {
        command: 'docker push registry/imagem:tag',
        description: 'Envia para registry',
      },
      {
        command: 'docker volume ls',
        description: 'Lista volumes',
      },
      {
        command: 'docker volume create meu-volume',
        description: 'Cria volume',
      },
      {
        command: 'docker volume rm meu-volume',
        description: 'Remove volume',
      },
      {
        command: 'docker network ls',
        description: 'Lista redes',
      },
      {
        command: 'docker network create minha-rede',
        description: 'Cria rede',
      },
      {
        command: 'docker inspect container_id',
        description: 'Detalhes do container',
      },
      {
        command: 'docker-compose up -d',
        description: 'Inicia serviços em background',
      },
      {
        command: 'docker-compose down',
        description: 'Para e remove containers',
      },
      {
        command: 'docker-compose ps',
        description: 'Lista serviços',
      },
      {
        command: 'docker-compose logs -f',
        description: 'Logs em tempo real',
      },
      {
        command: 'docker-compose restart',
        description: 'Reinicia serviços',
      },
      {
        command: 'docker-compose exec service_name bash',
        description: 'Acessa serviço',
      },
      {
        command: 'docker system prune',
        description: 'Remove recursos não usados',
      },
      {
        command: 'docker system prune -a --volumes',
        description: 'Limpeza completa (cuidado!)',
      },
      {
        command: 'docker container prune',
        description: 'Remove containers parados',
      },
      {
        command: 'docker image prune',
        description: 'Remove imagens não usadas',
      },
    ],
  },
  {
    id: 'network',
    title: 'Rede e Conectividade',
    icon: '🌐',
    commands: [
      {
        command: 'ip addr show',
        description: 'Mostra IPs de todas interfaces',
      },
      {
        command: 'ip a',
        description: 'Atalho do comando acima',
      },
      {
        command: 'ip route show',
        description: 'Mostra rotas',
      },
      {
        command: 'hostname -I',
        description: 'Mostra IP da máquina',
      },
      {
        command: 'ifconfig',
        description: 'Interfaces (comando antigo)',
      },
      {
        command: 'nmcli device show',
        description: 'NetworkManager info',
      },
      {
        command: 'ping -c 4 google.com',
        description: 'Testa conectividade (4 pacotes)',
      },
      {
        command: 'ping -c 1 8.8.8.8',
        description: 'Ping no DNS do Google',
      },
      {
        command: 'curl -I https://site.com',
        description: 'Verifica headers HTTP',
      },
      {
        command: 'wget -O- https://site.com',
        description: 'Baixa conteúdo',
      },
      {
        command: 'telnet servidor 80',
        description: 'Testa porta TCP',
      },
      {
        command: 'nc -zv servidor 22',
        description: 'Testa porta com netcat',
      },
      {
        command: 'traceroute google.com',
        description: 'Traça rota até destino',
      },
      {
        command: 'mtr google.com',
        description: 'Ping + traceroute combinados',
      },
      {
        command: 'netstat -tulpn',
        description: 'Portas em escuta (TCP/UDP)',
      },
      {
        command: 'ss -tulpn',
        description: 'Alternativa moderna ao netstat',
      },
      {
        command: 'lsof -i :80',
        description: 'Verifica quem usa porta 80',
      },
      {
        command: 'nmap localhost',
        description: 'Escaneia portas locais',
      },
      {
        command: 'nmap -p 80,443 servidor',
        description: 'Escaneia portas específicas',
      },
      {
        command: 'nslookup google.com',
        description: 'Consulta DNS',
      },
      {
        command: 'dig google.com',
        description: 'Consulta DNS detalhada',
      },
      {
        command: 'dig +short google.com',
        description: 'Apenas IP',
      },
      {
        command: 'host google.com',
        description: 'Consulta DNS simples',
      },
      {
        command: 'cat /etc/resolv.conf',
        description: 'Servidores DNS configurados',
      },
      {
        command: 'ufw status',
        description: 'Status do firewall (Ubuntu)',
      },
      {
        command: 'ufw enable',
        description: 'Ativa firewall',
      },
      {
        command: 'ufw allow 22',
        description: 'Libera porta 22',
      },
      {
        command: 'ufw allow from 192.168.1.0/24',
        description: 'Libera rede',
      },
      {
        command: 'ufw delete allow 80',
        description: 'Remove regra',
      },
      {
        command: 'firewall-cmd --state',
        description: 'Status do firewalld (CentOS)',
      },
      {
        command: 'firewall-cmd --list-all',
        description: 'Lista regras',
      },
      {
        command: 'firewall-cmd --add-port=80/tcp',
        description: 'Libera porta (temporário)',
      },
      {
        command: 'firewall-cmd --add-port=80/tcp --permanent',
        description: 'Libera porta (permanente)',
      },
      {
        command: 'firewall-cmd --reload',
        description: 'Recarrega configuração',
      },
    ],
  },
  {
    id: 'ssh',
    title: 'SSH e Transferência de Arquivos',
    icon: '🔐',
    commands: [
      {
        command: 'ssh usuario@servidor',
        description: 'Conecta via SSH',
      },
      {
        command: 'ssh -p 2222 usuario@servidor',
        description: 'Conecta em porta específica',
      },
      {
        command: 'ssh usuario@servidor "comando"',
        description: 'Executa comando remoto',
      },
      {
        command: 'ssh -i ~/.ssh/chave.pem usuario@servidor',
        description: 'Usa chave privada específica',
      },
      {
        command: 'ssh -L 8080:localhost:80 usuario@servidor',
        description: 'Port forwarding local',
      },
      {
        command: 'ssh -R 8080:localhost:80 usuario@servidor',
        description: 'Port forwarding remoto',
      },
      {
        command: 'ssh -X usuario@servidor',
        description: 'SSH com X11 forwarding (GUI)',
      },
      {
        command: 'ssh-keygen -t rsa -b 4096 -C "email@exemplo.com"',
        description: 'Gera chave RSA',
      },
      {
        command: 'ssh-keygen -t ed25519 -C "email@exemplo.com"',
        description: 'Gera chave ED25519 (recomendado)',
      },
      {
        command: 'ssh-copy-id usuario@servidor',
        description: 'Copia chave automaticamente',
      },
      {
        command: 'ssh-copy-id -i ~/.ssh/id_rsa.pub usuario@servidor',
        description: 'Copia chave específica',
      },
      {
        command: 'chmod 700 ~/.ssh',
        description: 'Permissão pasta .ssh',
      },
      {
        command: 'chmod 600 ~/.ssh/id_rsa',
        description: 'Permissão chave privada',
      },
      {
        command: 'chmod 644 ~/.ssh/id_rsa.pub',
        description: 'Permissão chave pública',
      },
      {
        command: 'chmod 644 ~/.ssh/authorized_keys',
        description: 'Permissão chaves autorizadas',
      },
      {
        command: 'chmod 644 ~/.ssh/config',
        description: 'Permissão arquivo de config',
      },
      {
        command: 'scp arquivo.txt usuario@servidor:/destino/',
        description: 'Copia para servidor remoto',
      },
      {
        command: 'scp -P 2222 arquivo.txt usuario@servidor:/destino/',
        description: 'Porta específica',
      },
      {
        command: 'scp -r pasta/ usuario@servidor:/destino/',
        description: 'Copia pasta recursivamente',
      },
      {
        command: 'scp -i ~/.ssh/chave.pem arquivo.txt usuario@servidor:/destino/',
        description: 'Com chave',
      },
      {
        command: 'scp usuario@servidor:/origem/arquivo.txt .',
        description: 'Copia do servidor remoto',
      },
      {
        command: 'scp usuario@servidor:/origem/arquivo.txt /destino/local/',
        description: 'Copia para local específico',
      },
      {
        command: 'scp -r usuario@servidor:/origem/pasta/ .',
        description: 'Pasta recursivamente',
      },
      {
        command: 'scp usuario1@servidor1:/arquivo.txt usuario2@servidor2:/destino/',
        description: 'Entre dois servidores remotos',
      },
      {
        command: 'scp -C arquivo.txt usuario@servidor:/destino/',
        description: 'Com compressão',
      },
      {
        command: 'scp -v arquivo.txt usuario@servidor:/destino/',
        description: 'Modo verbose',
      },
      {
        command: 'scp -l 1000 arquivo.txt usuario@servidor:/destino/',
        description: 'Limita banda (Kbit/s)',
      },
      {
        command: 'rsync -avz pasta/ usuario@servidor:/destino/',
        description: 'Sincronizar para servidor',
      },
      {
        command: 'rsync -avz -e "ssh -p 2222" pasta/ usuario@servidor:/destino/',
        description: 'Porta específica',
      },
      {
        command: 'rsync -avz --delete pasta/ usuario@servidor:/destino/',
        description: 'Remove arquivos extras no destino',
      },
      {
        command: 'rsync -avz usuario@servidor:/origem/ pasta/',
        description: 'Sincronizar do servidor',
      },
      {
        command: 'rsync -avz --progress pasta/ usuario@servidor:/destino/',
        description: 'Mostra progresso',
      },
      {
        command: 'rsync -avzn pasta/ usuario@servidor:/destino/',
        description: 'Dry-run (simula)',
      },
      {
        command: 'rsync -avz --exclude="*.log" pasta/ usuario@servidor:/destino/',
        description: 'Exclui padrão',
      },
      {
        command: 'systemctl status sshd',
        description: 'Status SSH (CentOS/AlmaLinux)',
      },
      {
        command: 'systemctl status ssh',
        description: 'Status SSH (Ubuntu)',
      },
      {
        command: 'systemctl restart sshd',
        description: 'Reinicia serviço SSH',
      },
      {
        command: 'systemctl enable sshd',
        description: 'Habilita SSH no boot',
      },
      {
        command: 'tail -f /var/log/auth.log',
        description: 'Logs SSH (Ubuntu)',
      },
      {
        command: 'tail -f /var/log/secure',
        description: 'Logs SSH (CentOS/AlmaLinux)',
      },
      {
        command: 'grep "Failed password" /var/log/auth.log',
        description: 'Tentativas de login falhadas',
      },
    ],
  },
  {
    id: 'users',
    title: 'Usuários e Grupos',
    icon: '👥',
    commands: [
      {
        command: 'useradd -m -s /bin/bash usuario',
        description: 'Cria usuário com home',
      },
      {
        command: 'useradd -m -G docker,sudo usuario',
        description: 'Cria e adiciona a grupos',
      },
      {
        command: 'passwd usuario',
        description: 'Define/altera senha',
      },
      {
        command: 'userdel usuario',
        description: 'Remove usuário',
      },
      {
        command: 'userdel -r usuario',
        description: 'Remove usuário e home',
      },
      {
        command: 'usermod -aG docker usuario',
        description: 'Adiciona usuário a grupo',
      },
      {
        command: 'usermod -s /bin/bash usuario',
        description: 'Muda shell padrão',
      },
      {
        command: 'id usuario',
        description: 'Mostra UID, GID e grupos',
      },
      {
        command: 'whoami',
        description: 'Mostra usuário atual',
      },
      {
        command: 'who',
        description: 'Usuários logados',
      },
      {
        command: 'last',
        description: 'Histórico de logins',
      },
      {
        command: 'groupadd grupo',
        description: 'Cria grupo',
      },
      {
        command: 'groupdel grupo',
        description: 'Remove grupo',
      },
      {
        command: 'groups usuario',
        description: 'Lista grupos do usuário',
      },
      {
        command: 'cat /etc/group',
        description: 'Todos os grupos do sistema',
      },
      {
        command: 'visudo',
        description: 'Edita configuração sudo (seguro)',
      },
      {
        command: 'sudo -i',
        description: 'Login como root',
      },
      {
        command: 'sudo su - usuario',
        description: 'Muda para outro usuário',
      },
      {
        command: 'sudo !!',
        description: 'Executa último comando como root',
      },
    ],
  },
  {
    id: 'packages',
    title: 'Instalação de Pacotes',
    icon: '📦',
    commands: [
      {
        command: 'apt update',
        description: 'Atualiza lista de pacotes (Ubuntu)',
      },
      {
        command: 'apt upgrade',
        description: 'Atualiza pacotes instalados',
      },
      {
        command: 'apt full-upgrade',
        description: 'Atualização completa',
      },
      {
        command: 'apt dist-upgrade',
        description: 'Atualiza distribuição',
      },
      {
        command: 'apt install pacote',
        description: 'Instala pacote',
      },
      {
        command: 'apt install pacote1 pacote2',
        description: 'Instala múltiplos',
      },
      {
        command: 'apt remove pacote',
        description: 'Remove pacote',
      },
      {
        command: 'apt purge pacote',
        description: 'Remove pacote e configs',
      },
      {
        command: 'apt autoremove',
        description: 'Remove dependências órfãs',
      },
      {
        command: 'apt search palavra-chave',
        description: 'Busca pacotes',
      },
      {
        command: 'apt show pacote',
        description: 'Informações do pacote',
      },
      {
        command: 'apt list --installed',
        description: 'Lista pacotes instalados',
      },
      {
        command: 'dpkg -l',
        description: 'Lista todos pacotes (dpkg)',
      },
      {
        command: 'dpkg -i pacote.deb',
        description: 'Instala .deb local',
      },
      {
        command: 'apt clean',
        description: 'Limpa cache',
      },
      {
        command: 'apt autoclean',
        description: 'Limpa cache antigo',
      },
      {
        command: 'yum update',
        description: 'Atualiza pacotes (CentOS 7)',
      },
      {
        command: 'dnf update',
        description: 'Atualiza pacotes (CentOS 8+)',
      },
      {
        command: 'yum upgrade',
        description: 'Upgrade completo',
      },
      {
        command: 'yum install pacote',
        description: 'Instala pacote (CentOS)',
      },
      {
        command: 'dnf install pacote',
        description: 'Instala (CentOS 8+)',
      },
      {
        command: 'yum remove pacote',
        description: 'Remove pacote',
      },
      {
        command: 'yum autoremove',
        description: 'Remove dependências órfãs',
      },
      {
        command: 'yum search palavra-chave',
        description: 'Busca pacotes',
      },
      {
        command: 'yum info pacote',
        description: 'Informações do pacote',
      },
      {
        command: 'yum list installed',
        description: 'Lista instalados',
      },
      {
        command: 'rpm -qa',
        description: 'Lista todos pacotes (rpm)',
      },
      {
        command: 'rpm -ivh pacote.rpm',
        description: 'Instala .rpm local',
      },
      {
        command: 'yum repolist',
        description: 'Lista repositórios',
      },
      {
        command: 'yum-config-manager --enable repo',
        description: 'Habilita repositório',
      },
      {
        command: 'yum-config-manager --disable repo',
        description: 'Desabilita repositório',
      },
      {
        command: 'yum clean all',
        description: 'Limpa cache',
      },
      {
        command: 'dnf clean all',
        description: 'Limpa cache (CentOS 8+)',
      },
      {
        command: 'yum install epel-release',
        description: 'Instala EPEL (CentOS 7)',
      },
      {
        command: 'dnf install epel-release',
        description: 'Instala EPEL (CentOS 8+)',
      },
    ],
  },
  {
    id: 'system',
    title: 'Comandos de Sistema',
    icon: '🔧',
    commands: [
      {
        command: 'uname -a',
        description: 'Info do kernel',
      },
      {
        command: 'hostnamectl',
        description: 'Info do sistema',
      },
      {
        command: 'cat /etc/os-release',
        description: 'Info da distribuição',
      },
      {
        command: 'lsb_release -a',
        description: 'Info da versão (Ubuntu)',
      },
      {
        command: 'uptime',
        description: 'Tempo ligado',
      },
      {
        command: 'date',
        description: 'Data e hora',
      },
      {
        command: 'timedatectl',
        description: 'Config de data/hora',
      },
      {
        command: 'df -h',
        description: 'Espaço em disco',
      },
      {
        command: 'du -sh pasta/',
        description: 'Tamanho de pasta',
      },
      {
        command: 'free -h',
        description: 'Memória RAM',
      },
      {
        command: 'ps aux',
        description: 'Lista todos processos',
      },
      {
        command: 'ps aux | grep nginx',
        description: 'Busca processo específico',
      },
      {
        command: 'top',
        description: 'Monitor interativo',
      },
      {
        command: 'htop',
        description: 'Monitor melhorado (precisa instalar)',
      },
      {
        command: 'kill PID',
        description: 'Mata processo',
      },
      {
        command: 'kill -9 PID',
        description: 'Força encerramento',
      },
      {
        command: 'killall nome_processo',
        description: 'Mata todos com esse nome',
      },
      {
        command: 'systemctl status servico',
        description: 'Status de serviço',
      },
      {
        command: 'systemctl start servico',
        description: 'Inicia serviço',
      },
      {
        command: 'systemctl stop servico',
        description: 'Para serviço',
      },
      {
        command: 'systemctl restart servico',
        description: 'Reinicia serviço',
      },
      {
        command: 'systemctl enable servico',
        description: 'Habilita no boot',
      },
      {
        command: 'journalctl -xe',
        description: 'Últimos logs do sistema',
      },
      {
        command: 'journalctl -u nginx',
        description: 'Logs de serviço específico',
      },
      {
        command: 'journalctl -f',
        description: 'Logs em tempo real',
      },
      {
        command: 'tail -f /var/log/syslog',
        description: 'Logs Ubuntu',
      },
      {
        command: 'tail -f /var/log/messages',
        description: 'Logs CentOS/AlmaLinux',
      },
    ],
  },
  {
    id: 'disk',
    title: 'Verificação de Discos',
    icon: '💾',
    commands: [
      {
        command: 'df -h',
        description: 'Espaço em disco (formato legível)',
      },
      {
        command: 'df -h /',
        description: 'Espaço em disco da raiz',
      },
      {
        command: 'df -h /home',
        description: 'Espaço em disco do /home',
      },
      {
        command: 'df -i',
        description: 'Uso de inodes',
      },
      {
        command: 'df -T',
        description: 'Mostra tipo do sistema de arquivos',
      },
      {
        command: 'du -sh *',
        description: 'Tamanho de cada item no diretório atual',
      },
      {
        command: 'du -sh pasta/',
        description: 'Tamanho total de uma pasta',
      },
      {
        command: 'du -h --max-depth=1',
        description: 'Tamanho de subpastas (1 nível)',
      },
      {
        command: 'du -h --max-depth=2 | sort -h',
        description: 'Tamanho ordenado (2 níveis)',
      },
      {
        command: 'du -sh * | sort -h',
        description: 'Ordenado por tamanho (legível)',
      },
      {
        command: 'du -sh * | sort -hr | head -10',
        description: '10 maiores itens',
      },
      {
        command: 'ncdu',
        description: 'Analisador interativo de disco (precisa instalar)',
      },
      {
        command: 'ncdu /var',
        description: 'Analisa diretório específico',
      },
      {
        command: 'lsblk',
        description: 'Lista dispositivos de bloco',
      },
      {
        command: 'lsblk -f',
        description: 'Lista com sistema de arquivos',
      },
      {
        command: 'fdisk -l',
        description: 'Lista partições de disco',
      },
      {
        command: 'parted -l',
        description: 'Info de partições (alternativa)',
      },
      {
        command: 'blkid',
        description: 'UUID e tipo de partições',
      },
      {
        command: 'mount | column -t',
        description: 'Sistemas de arquivos montados',
      },
      {
        command: 'findmnt',
        description: 'Árvore de pontos de montagem',
      },
      {
        command: 'find / -type f -size +100M',
        description: 'Arquivos maiores que 100MB',
      },
      {
        command: 'find / -type f -size +1G',
        description: 'Arquivos maiores que 1GB',
      },
      {
        command: 'find /var -type f -size +50M -exec ls -lh {} \\;',
        description: 'Busca e lista arquivos grandes',
      },
      {
        command: 'iostat -x',
        description: 'Estatísticas de I/O de disco',
      },
      {
        command: 'iotop',
        description: 'Monitor de I/O por processo',
      },
    ],
  },
  {
    id: 'logs',
    title: 'Logs do Sistema',
    icon: '📋',
    commands: [
      {
        command: 'journalctl',
        description: 'Visualiza logs do systemd',
      },
      {
        command: 'journalctl -xe',
        description: 'Últimos logs com explicações',
      },
      {
        command: 'journalctl -f',
        description: 'Logs em tempo real',
      },
      {
        command: 'journalctl -u nginx',
        description: 'Logs de serviço específico',
      },
      {
        command: 'journalctl -u nginx -f',
        description: 'Logs de serviço em tempo real',
      },
      {
        command: 'journalctl --since "1 hour ago"',
        description: 'Logs da última hora',
      },
      {
        command: 'journalctl --since "2024-01-01"',
        description: 'Logs desde data específica',
      },
      {
        command: 'journalctl --since today',
        description: 'Logs de hoje',
      },
      {
        command: 'journalctl --since yesterday',
        description: 'Logs de ontem',
      },
      {
        command: 'journalctl -p err',
        description: 'Apenas erros',
      },
      {
        command: 'journalctl -p warning',
        description: 'Warnings e acima',
      },
      {
        command: 'journalctl -b',
        description: 'Logs do boot atual',
      },
      {
        command: 'journalctl -b -1',
        description: 'Logs do boot anterior',
      },
      {
        command: 'journalctl --disk-usage',
        description: 'Espaço usado pelos logs',
      },
      {
        command: 'journalctl --vacuum-time=7d',
        description: 'Remove logs com mais de 7 dias',
      },
      {
        command: 'journalctl --vacuum-size=500M',
        description: 'Limita logs a 500MB',
      },
      {
        command: 'tail -f /var/log/syslog',
        description: 'Logs do sistema (Ubuntu)',
      },
      {
        command: 'tail -f /var/log/messages',
        description: 'Logs do sistema (CentOS/RHEL)',
      },
      {
        command: 'tail -f /var/log/auth.log',
        description: 'Logs de autenticação (Ubuntu)',
      },
      {
        command: 'tail -f /var/log/secure',
        description: 'Logs de autenticação (CentOS/RHEL)',
      },
      {
        command: 'tail -f /var/log/kern.log',
        description: 'Logs do kernel',
      },
      {
        command: 'tail -f /var/log/apache2/error.log',
        description: 'Erros do Apache (Ubuntu)',
      },
      {
        command: 'tail -f /var/log/httpd/error_log',
        description: 'Erros do Apache (CentOS/RHEL)',
      },
      {
        command: 'tail -f /var/log/nginx/error.log',
        description: 'Erros do Nginx',
      },
      {
        command: 'tail -f /var/log/nginx/access.log',
        description: 'Acessos do Nginx',
      },
      {
        command: 'tail -n 100 /var/log/syslog',
        description: 'Últimas 100 linhas',
      },
      {
        command: 'grep -i "error" /var/log/syslog',
        description: 'Busca erros no syslog',
      },
      {
        command: 'grep -i "failed" /var/log/auth.log',
        description: 'Tentativas de login falhadas',
      },
      {
        command: 'grep "$(date +%Y-%m-%d)" /var/log/syslog',
        description: 'Logs de hoje',
      },
      {
        command: 'zgrep "error" /var/log/syslog.1.gz',
        description: 'Busca em logs compactados',
      },
      {
        command: 'dmesg',
        description: 'Mensagens do kernel (buffer)',
      },
      {
        command: 'dmesg -T',
        description: 'Mensagens com timestamp legível',
      },
      {
        command: 'dmesg -w',
        description: 'Monitora mensagens do kernel',
      },
      {
        command: 'dmesg | grep -i error',
        description: 'Erros do kernel',
      },
      {
        command: 'dmesg | grep -i usb',
        description: 'Mensagens relacionadas a USB',
      },
      {
        command: 'last',
        description: 'Histórico de logins',
      },
      {
        command: 'last -n 20',
        description: 'Últimos 20 logins',
      },
      {
        command: 'lastb',
        description: 'Tentativas de login falhadas',
      },
      {
        command: 'lastlog',
        description: 'Último login de cada usuário',
      },
      {
        command: 'cat /var/log/fail2ban/fail2ban.log',
        description: 'Logs do Fail2ban',
      },
      {
        command: 'logrotate -f /etc/logrotate.conf',
        description: 'Força rotação de logs',
      },
    ],
  },
  {
    id: 'services',
    title: 'Serviços e Processos',
    icon: '⚙️',
    commands: [
      {
        command: 'systemctl list-units --type=service',
        description: 'Lista todos serviços',
      },
      {
        command: 'systemctl list-units --type=service --state=running',
        description: 'Serviços em execução',
      },
      {
        command: 'systemctl list-units --type=service --state=failed',
        description: 'Serviços com falha',
      },
      {
        command: 'systemctl status servico',
        description: 'Status de serviço',
      },
      {
        command: 'systemctl start servico',
        description: 'Inicia serviço',
      },
      {
        command: 'systemctl stop servico',
        description: 'Para serviço',
      },
      {
        command: 'systemctl restart servico',
        description: 'Reinicia serviço',
      },
      {
        command: 'systemctl reload servico',
        description: 'Recarrega configuração (sem reiniciar)',
      },
      {
        command: 'systemctl enable servico',
        description: 'Habilita serviço no boot',
      },
      {
        command: 'systemctl disable servico',
        description: 'Desabilita serviço no boot',
      },
      {
        command: 'systemctl is-active servico',
        description: 'Verifica se está ativo',
      },
      {
        command: 'systemctl is-enabled servico',
        description: 'Verifica se está habilitado',
      },
      {
        command: 'systemctl mask servico',
        description: 'Bloqueia serviço (não pode iniciar)',
      },
      {
        command: 'systemctl unmask servico',
        description: 'Desbloqueia serviço',
      },
      {
        command: 'systemctl daemon-reload',
        description: 'Recarrega arquivos de serviço',
      },
      {
        command: 'systemctl list-dependencies servico',
        description: 'Dependências do serviço',
      },
      {
        command: 'systemctl cat servico',
        description: 'Mostra arquivo de configuração',
      },
      {
        command: 'systemctl edit servico',
        description: 'Edita configuração do serviço',
      },
      {
        command: 'ps aux',
        description: 'Lista todos processos',
      },
      {
        command: 'ps aux | grep nginx',
        description: 'Busca processo específico',
      },
      {
        command: 'ps -ef',
        description: 'Lista processos (formato estendido)',
      },
      {
        command: 'ps -eLf',
        description: 'Lista processos com threads',
      },
      {
        command: 'ps -u usuario',
        description: 'Processos de um usuário',
      },
      {
        command: 'pgrep nginx',
        description: 'PID de processos por nome',
      },
      {
        command: 'pgrep -u usuario',
        description: 'PIDs de processos do usuário',
      },
      {
        command: 'pidof nginx',
        description: 'PID do processo',
      },
      {
        command: 'top',
        description: 'Monitor interativo de processos',
      },
      {
        command: 'htop',
        description: 'Monitor melhorado (precisa instalar)',
      },
      {
        command: 'top -u usuario',
        description: 'Processos de um usuário',
      },
      {
        command: 'kill PID',
        description: 'Mata processo (SIGTERM)',
      },
      {
        command: 'kill -9 PID',
        description: 'Força encerramento (SIGKILL)',
      },
      {
        command: 'kill -15 PID',
        description: 'Encerramento gracioso (SIGTERM)',
      },
      {
        command: 'killall nome_processo',
        description: 'Mata todos com esse nome',
      },
      {
        command: 'pkill nginx',
        description: 'Mata processos por nome',
      },
      {
        command: 'pkill -u usuario',
        description: 'Mata processos do usuário',
      },
      {
        command: 'nice -n 10 comando',
        description: 'Executa com baixa prioridade',
      },
      {
        command: 'renice -n 5 -p PID',
        description: 'Altera prioridade de processo',
      },
      {
        command: 'bg',
        description: 'Continua processo em background',
      },
      {
        command: 'fg',
        description: 'Traz processo para foreground',
      },
      {
        command: 'jobs',
        description: 'Lista jobs em background',
      },
      {
        command: 'nohup comando &',
        description: 'Executa ignorando HUP (logout)',
      },
      {
        command: 'service --status-all',
        description: 'Status de todos serviços (SysV)',
      },
      {
        command: 'service nginx status',
        description: 'Status serviço (SysV)',
      },
      {
        command: 'service nginx start',
        description: 'Inicia serviço (SysV)',
      },
    ],
  },
  {
    id: 'cron',
    title: 'Agendamento (Cron)',
    icon: '⏰',
    commands: [
      {
        command: 'crontab -l',
        description: 'Lista tarefas agendadas do usuário',
      },
      {
        command: 'crontab -e',
        description: 'Edita crontab do usuário',
      },
      {
        command: 'crontab -r',
        description: 'Remove crontab do usuário',
      },
      {
        command: 'crontab -u usuario -l',
        description: 'Lista crontab de outro usuário',
      },
      {
        command: 'crontab -u usuario -e',
        description: 'Edita crontab de outro usuário',
      },
      {
        command: 'cat /etc/crontab',
        description: 'Crontab do sistema',
      },
      {
        command: 'ls -la /etc/cron.d/',
        description: 'Cron jobs em /etc/cron.d',
      },
      {
        command: 'ls -la /etc/cron.daily/',
        description: 'Scripts executados diariamente',
      },
      {
        command: 'ls -la /etc/cron.hourly/',
        description: 'Scripts executados de hora em hora',
      },
      {
        command: 'ls -la /etc/cron.weekly/',
        description: 'Scripts executados semanalmente',
      },
      {
        command: 'ls -la /etc/cron.monthly/',
        description: 'Scripts executados mensalmente',
      },
      {
        command: 'cat /var/spool/cron/crontabs/usuario',
        description: 'Crontab do usuário (arquivo direto)',
      },
      {
        command: 'systemctl status cron',
        description: 'Status do serviço cron (Ubuntu)',
      },
      {
        command: 'systemctl status crond',
        description: 'Status do serviço cron (CentOS/RHEL)',
      },
      {
        command: 'systemctl restart cron',
        description: 'Reinicia serviço cron',
      },
      {
        command: 'grep CRON /var/log/syslog',
        description: 'Logs de execução cron (Ubuntu)',
      },
      {
        command: 'grep CRON /var/log/cron',
        description: 'Logs de execução cron (CentOS/RHEL)',
      },
      {
        command: 'tail -f /var/log/syslog | grep CRON',
        description: 'Monitora execuções cron (Ubuntu)',
      },
      {
        command: 'tail -f /var/log/cron',
        description: 'Monitora execuções cron (CentOS/RHEL)',
      },
      {
        command: '* * * * * comando',
        description: 'Formato: minuto hora dia mês dia_semana',
      },
      {
        command: '0 2 * * * /script.sh',
        description: 'Executa às 2h da manhã todos os dias',
      },
      {
        command: '*/5 * * * * /script.sh',
        description: 'Executa a cada 5 minutos',
      },
      {
        command: '0 */2 * * * /script.sh',
        description: 'Executa a cada 2 horas',
      },
      {
        command: '0 0 * * 0 /script.sh',
        description: 'Executa aos domingos à meia-noite',
      },
      {
        command: '0 0 1 * * /script.sh',
        description: 'Executa no dia 1 de cada mês',
      },
      {
        command: '@reboot /script.sh',
        description: 'Executa no boot',
      },
      {
        command: '@daily /script.sh',
        description: 'Executa diariamente (0h)',
      },
      {
        command: '@hourly /script.sh',
        description: 'Executa a cada hora',
      },
      {
        command: '@weekly /script.sh',
        description: 'Executa semanalmente',
      },
      {
        command: '@monthly /script.sh',
        description: 'Executa mensalmente',
      },
      {
        command: 'run-parts /etc/cron.daily',
        description: 'Executa scripts de uma pasta',
      },
      {
        command: 'anacron -T',
        description: 'Testa sintaxe do anacrontab',
      },
      {
        command: 'cat /etc/anacrontab',
        description: 'Configuração do anacron',
      },
    ],
  },
  {
    id: 'git',
    title: 'Git',
    icon: '🔀',
    commands: [
      {
        command: 'git init',
        description: 'Inicializa repositório',
      },
      {
        command: 'git clone https://github.com/user/repo.git',
        description: 'Clona repositório',
      },
      {
        command: 'git status',
        description: 'Status do repositório',
      },
      {
        command: 'git add .',
        description: 'Adiciona todos arquivos',
      },
      {
        command: 'git add arquivo.txt',
        description: 'Adiciona arquivo específico',
      },
      {
        command: 'git commit -m "mensagem"',
        description: 'Faz commit com mensagem',
      },
      {
        command: 'git commit -am "mensagem"',
        description: 'Add e commit juntos',
      },
      {
        command: 'git push',
        description: 'Envia para repositório remoto',
      },
      {
        command: 'git push origin branch',
        description: 'Push em branch específica',
      },
      {
        command: 'git pull',
        description: 'Atualiza do repositório remoto',
      },
      {
        command: 'git pull origin branch',
        description: 'Pull de branch específica',
      },
      {
        command: 'git branch',
        description: 'Lista branches',
      },
      {
        command: 'git branch nova-branch',
        description: 'Cria nova branch',
      },
      {
        command: 'git checkout branch',
        description: 'Muda para branch',
      },
      {
        command: 'git checkout -b nova-branch',
        description: 'Cria e muda para nova branch',
      },
      {
        command: 'git merge branch',
        description: 'Faz merge de branch',
      },
      {
        command: 'git log',
        description: 'Histórico de commits',
      },
      {
        command: 'git log --oneline',
        description: 'Histórico resumido',
      },
      {
        command: 'git log --graph --all',
        description: 'Histórico gráfico',
      },
      {
        command: 'git diff',
        description: 'Mostra diferenças',
      },
      {
        command: 'git diff arquivo.txt',
        description: 'Diferenças em arquivo',
      },
      {
        command: 'git reset HEAD arquivo.txt',
        description: 'Remove do stage',
      },
      {
        command: 'git reset --hard HEAD',
        description: 'Descarta todas mudanças',
      },
      {
        command: 'git stash',
        description: 'Guarda mudanças temporariamente',
      },
      {
        command: 'git stash pop',
        description: 'Recupera mudanças guardadas',
      },
      {
        command: 'git remote -v',
        description: 'Lista repositórios remotos',
      },
      {
        command: 'git remote add origin url',
        description: 'Adiciona repositório remoto',
      },
      {
        command: 'git tag v1.0.0',
        description: 'Cria tag',
      },
      {
        command: 'git push --tags',
        description: 'Envia tags',
      },
    ],
  },
  {
    id: 'text',
    title: 'Manipulação de Texto',
    icon: '📝',
    commands: [
      {
        command: 'echo "texto"',
        description: 'Exibe texto',
      },
      {
        command: 'echo "texto" > arquivo.txt',
        description: 'Sobrescreve arquivo',
      },
      {
        command: 'echo "texto" >> arquivo.txt',
        description: 'Adiciona ao final',
      },
      {
        command: 'cat arquivo1.txt arquivo2.txt > final.txt',
        description: 'Concatena arquivos',
      },
      {
        command: 'wc -l arquivo.txt',
        description: 'Conta linhas',
      },
      {
        command: 'wc -w arquivo.txt',
        description: 'Conta palavras',
      },
      {
        command: 'wc -c arquivo.txt',
        description: 'Conta caracteres',
      },
      {
        command: 'sort arquivo.txt',
        description: 'Ordena linhas',
      },
      {
        command: 'sort -r arquivo.txt',
        description: 'Ordena reverso',
      },
      {
        command: 'sort -u arquivo.txt',
        description: 'Ordena e remove duplicatas',
      },
      {
        command: 'uniq arquivo.txt',
        description: 'Remove linhas duplicadas adjacentes',
      },
      {
        command: 'cut -d ":" -f 1 /etc/passwd',
        description: 'Corta por delimitador',
      },
      {
        command: 'sed "s/antigo/novo/g" arquivo.txt',
        description: 'Substitui texto',
      },
      {
        command: 'sed -i "s/antigo/novo/g" arquivo.txt',
        description: 'Substitui texto no arquivo',
      },
      {
        command: 'awk \'{print $1}\' arquivo.txt',
        description: 'Imprime primeira coluna',
      },
      {
        command: 'awk -F ":" \'{print $1}\' /etc/passwd',
        description: 'Define delimitador',
      },
      {
        command: 'tr "a-z" "A-Z" < arquivo.txt',
        description: 'Converte para maiúsculas',
      },
      {
        command: 'tr -d " " < arquivo.txt',
        description: 'Remove espaços',
      },
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoramento e Performance',
    icon: '📊',
    commands: [
      {
        command: 'vmstat 1',
        description: 'Estatísticas de memória virtual',
      },
      {
        command: 'iostat -x 1',
        description: 'Estatísticas de I/O',
      },
      {
        command: 'iotop',
        description: 'Monitor de I/O por processo',
      },
      {
        command: 'sar -u 1 10',
        description: 'CPU usage (10 amostras)',
      },
      {
        command: 'sar -r 1 10',
        description: 'Memória usage',
      },
      {
        command: 'mpstat -P ALL 1',
        description: 'Estatísticas por CPU',
      },
      {
        command: 'pidstat -p PID 1',
        description: 'Estatísticas de processo',
      },
      {
        command: 'lsof',
        description: 'Lista arquivos abertos',
      },
      {
        command: 'lsof -u usuario',
        description: 'Arquivos abertos por usuário',
      },
      {
        command: 'lsof -c processo',
        description: 'Arquivos abertos por processo',
      },
      {
        command: 'strace -p PID',
        description: 'Rastreia chamadas do sistema',
      },
      {
        command: 'ltrace -p PID',
        description: 'Rastreia chamadas de biblioteca',
      },
      {
        command: 'dmesg | tail',
        description: 'Últimas mensagens do kernel',
      },
      {
        command: 'dmesg -w',
        description: 'Monitora mensagens do kernel',
      },
      {
        command: 'watch -n 1 "comando"',
        description: 'Executa comando repetidamente',
      },
    ],
  },
  {
    id: 'shortcuts',
    title: 'Atalhos e Dicas',
    icon: '💡',
    commands: [
      {
        command: 'Ctrl + C',
        description: 'Cancela comando atual',
      },
      {
        command: 'Ctrl + Z',
        description: 'Suspende processo',
      },
      {
        command: 'Ctrl + D',
        description: 'Logout / EOF',
      },
      {
        command: 'Ctrl + L',
        description: 'Limpa tela (clear)',
      },
      {
        command: 'Ctrl + R',
        description: 'Busca no histórico',
      },
      {
        command: 'Ctrl + A',
        description: 'Início da linha',
      },
      {
        command: 'Ctrl + E',
        description: 'Fim da linha',
      },
      {
        command: '!!',
        description: 'Repete último comando',
      },
      {
        command: '!$',
        description: 'Último argumento do comando anterior',
      },
      {
        command: 'comando > arquivo.txt',
        description: 'Salva saída em arquivo (sobrescreve)',
      },
      {
        command: 'comando >> arquivo.txt',
        description: 'Adiciona ao final do arquivo',
      },
      {
        command: 'comando 2> erros.txt',
        description: 'Redireciona erros',
      },
      {
        command: 'comando &> tudo.txt',
        description: 'Redireciona tudo',
      },
      {
        command: 'comando1 | comando2',
        description: 'Pipe (saída de 1 vira entrada de 2)',
      },
      {
        command: 'comando1 && comando2',
        description: 'Executa 2 se 1 teve sucesso',
      },
      {
        command: 'comando1 || comando2',
        description: 'Executa 2 se 1 falhou',
      },
      {
        command: 'comando1 ; comando2',
        description: 'Executa ambos sequencialmente',
      },
      {
        command: 'comando &',
        description: 'Executa em background',
      },
      {
        command: 'alias ll="ls -lah"',
        description: 'Cria alias',
      },
      {
        command: 'history',
        description: 'Mostra histórico de comandos',
      },
      {
        command: 'history | grep "comando"',
        description: 'Busca no histórico',
      },
    ],
  },
  {
    id: 'vi',
    title: 'Editor Vi',
    icon: '📄',
    commands: [
      {
        command: 'vi arquivo.txt',
        description: 'Abre arquivo no Vi',
      },
      {
        command: 'vi +10 arquivo.txt',
        description: 'Abre arquivo na linha 10',
      },
      {
        command: 'i',
        description: 'Modo INSERT (inserir texto)',
      },
      {
        command: 'ESC',
        description: 'Volta para modo COMANDO',
      },
      {
        command: ':w',
        description: 'Salva arquivo',
      },
      {
        command: ':q',
        description: 'Sai do Vi',
      },
      {
        command: ':wq',
        description: 'Salva e sai',
      },
      {
        command: ':q!',
        description: 'Sai sem salvar (força)',
      },
      {
        command: ':w novo.txt',
        description: 'Salva como novo arquivo',
      },
      {
        command: 'x',
        description: 'Deleta caractere',
      },
      {
        command: 'dd',
        description: 'Deleta linha inteira',
      },
      {
        command: '5dd',
        description: 'Deleta 5 linhas',
      },
      {
        command: 'yy',
        description: 'Copia linha',
      },
      {
        command: '5yy',
        description: 'Copia 5 linhas',
      },
      {
        command: 'p',
        description: 'Cola após cursor',
      },
      {
        command: 'P',
        description: 'Cola antes do cursor',
      },
      {
        command: 'u',
        description: 'Desfazer (undo)',
      },
      {
        command: '/texto',
        description: 'Busca "texto" para frente',
      },
      {
        command: '?texto',
        description: 'Busca "texto" para trás',
      },
      {
        command: 'n',
        description: 'Próxima ocorrência da busca',
      },
      {
        command: 'N',
        description: 'Ocorrência anterior da busca',
      },
      {
        command: ':s/antigo/novo/',
        description: 'Substitui na linha atual',
      },
      {
        command: ':%s/antigo/novo/g',
        description: 'Substitui em todo arquivo',
      },
      {
        command: 'gg',
        description: 'Vai para primeira linha',
      },
      {
        command: 'G',
        description: 'Vai para última linha',
      },
      {
        command: ':50',
        description: 'Vai para linha 50',
      },
      {
        command: '0',
        description: 'Início da linha',
      },
      {
        command: '$',
        description: 'Fim da linha',
      },
      {
        command: 'A',
        description: 'Modo INSERT no fim da linha',
      },
      {
        command: 'o',
        description: 'Insere linha abaixo',
      },
      {
        command: 'O',
        description: 'Insere linha acima',
      },
    ],
  },
  {
    id: 'vim',
    title: 'Editor Vim',
    icon: '✏️',
    commands: [
      {
        command: 'vim arquivo.txt',
        description: 'Abre arquivo no Vim',
      },
      {
        command: 'vim +10 arquivo.txt',
        description: 'Abre arquivo na linha 10',
      },
      {
        command: 'vim -o arquivo1 arquivo2',
        description: 'Abre múltiplos arquivos (split horizontal)',
      },
      {
        command: 'vim -O arquivo1 arquivo2',
        description: 'Abre múltiplos arquivos (split vertical)',
      },
      {
        command: 'vim -d arquivo1 arquivo2',
        description: 'Modo diff (comparação)',
      },
      {
        command: ':e arquivo.txt',
        description: 'Abre arquivo para edição',
      },
      {
        command: ':e!',
        description: 'Recarrega arquivo descartando mudanças',
      },
      {
        command: ':w',
        description: 'Salva arquivo',
      },
      {
        command: ':wq ou :x',
        description: 'Salva e sai',
      },
      {
        command: ':q!',
        description: 'Sai sem salvar',
      },
      {
        command: ':saveas novo.txt',
        description: 'Salva como novo arquivo',
      },
      {
        command: 'i',
        description: 'Modo INSERT antes do cursor',
      },
      {
        command: 'a',
        description: 'Modo INSERT depois do cursor',
      },
      {
        command: 'I',
        description: 'INSERT no início da linha',
      },
      {
        command: 'A',
        description: 'INSERT no fim da linha',
      },
      {
        command: 'o',
        description: 'Nova linha abaixo',
      },
      {
        command: 'O',
        description: 'Nova linha acima',
      },
      {
        command: 'ESC',
        description: 'Volta para modo NORMAL',
      },
      {
        command: 'v',
        description: 'Modo VISUAL (seleção)',
      },
      {
        command: 'V',
        description: 'Modo VISUAL LINE (linhas inteiras)',
      },
      {
        command: 'Ctrl+v',
        description: 'Modo VISUAL BLOCK (blocos)',
      },
      {
        command: 'x',
        description: 'Deleta caractere',
      },
      {
        command: 'dd',
        description: 'Deleta linha',
      },
      {
        command: 'dw',
        description: 'Deleta palavra',
      },
      {
        command: 'd$',
        description: 'Deleta até fim da linha',
      },
      {
        command: 'D',
        description: 'Deleta até fim da linha (atalho)',
      },
      {
        command: 'yy',
        description: 'Copia linha',
      },
      {
        command: 'yw',
        description: 'Copia palavra',
      },
      {
        command: 'y$',
        description: 'Copia até fim da linha',
      },
      {
        command: 'p',
        description: 'Cola após cursor/linha',
      },
      {
        command: 'P',
        description: 'Cola antes do cursor/linha',
      },
      {
        command: 'u',
        description: 'Desfazer (undo)',
      },
      {
        command: 'Ctrl+r',
        description: 'Refazer (redo)',
      },
      {
        command: '.',
        description: 'Repete último comando',
      },
      {
        command: '/texto',
        description: 'Busca "texto"',
      },
      {
        command: 'n',
        description: 'Próxima ocorrência',
      },
      {
        command: 'N',
        description: 'Ocorrência anterior',
      },
      {
        command: ':s/antigo/novo/',
        description: 'Substitui na linha atual',
      },
      {
        command: ':%s/antigo/novo/g',
        description: 'Substitui em todo arquivo',
      },
      {
        command: ':%s/antigo/novo/gc',
        description: 'Substitui com confirmação',
      },
      {
        command: 'gg',
        description: 'Primeira linha',
      },
      {
        command: 'G',
        description: 'Última linha',
      },
      {
        command: ':50',
        description: 'Vai para linha 50',
      },
      {
        command: '0',
        description: 'Início da linha',
      },
      {
        command: '$',
        description: 'Fim da linha',
      },
      {
        command: 'w',
        description: 'Próxima palavra',
      },
      {
        command: 'b',
        description: 'Palavra anterior',
      },
      {
        command: 'Ctrl+f',
        description: 'Página abaixo',
      },
      {
        command: 'Ctrl+b',
        description: 'Página acima',
      },
      {
        command: ':split',
        description: 'Divide janela horizontalmente',
      },
      {
        command: ':vsplit',
        description: 'Divide janela verticalmente',
      },
      {
        command: 'Ctrl+w w',
        description: 'Alterna entre janelas',
      },
      {
        command: 'Ctrl+w q',
        description: 'Fecha janela atual',
      },
      {
        command: ':tabnew',
        description: 'Nova aba',
      },
      {
        command: 'gt',
        description: 'Próxima aba',
      },
      {
        command: 'gT',
        description: 'Aba anterior',
      },
      {
        command: ':set number',
        description: 'Mostra números de linha',
      },
      {
        command: ':set nonumber',
        description: 'Oculta números de linha',
      },
      {
        command: ':set paste',
        description: 'Modo paste (para colar código)',
      },
      {
        command: ':syntax on',
        description: 'Ativa syntax highlighting',
      },
      {
        command: ':set hlsearch',
        description: 'Destaca resultados da busca',
      },
      {
        command: ':noh',
        description: 'Remove destaque da busca',
      },
      {
        command: ':help',
        description: 'Abre ajuda do Vim',
      },
      {
        command: 'vimtutor',
        description: 'Tutorial interativo (terminal)',
      },
    ],
  },
  {
    id: 'cat',
    title: 'Cat - Visualizar e Criar Arquivos',
    icon: '🐱',
    commands: [
      {
        command: 'cat arquivo.txt',
        description: 'Exibe conteúdo do arquivo',
      },
      {
        command: 'cat arquivo1.txt arquivo2.txt',
        description: 'Exibe múltiplos arquivos',
      },
      {
        command: 'cat -n arquivo.txt',
        description: 'Exibe com números de linha',
      },
      {
        command: 'cat -b arquivo.txt',
        description: 'Numera apenas linhas não vazias',
      },
      {
        command: 'cat -s arquivo.txt',
        description: 'Remove linhas vazias consecutivas',
      },
      {
        command: 'cat -A arquivo.txt',
        description: 'Mostra todos caracteres especiais',
      },
      {
        command: 'cat -T arquivo.txt',
        description: 'Mostra tabs como ^I',
      },
      {
        command: 'cat -E arquivo.txt',
        description: 'Mostra fim de linha como $',
      },
      {
        command: 'cat > arquivo.txt',
        description: 'Cria arquivo (digite texto e Ctrl+D para salvar)',
        example: 'Digite linhas de texto, pressione Enter para nova linha, Ctrl+D quando terminar',
      },
      {
        command: 'cat >> arquivo.txt',
        description: 'Adiciona ao final do arquivo',
        example: 'Mesmo que acima, mas preserva conteúdo existente',
      },
      {
        command: 'cat << EOF > arquivo.txt',
        description: 'Cria arquivo com heredoc (múltiplas linhas)',
        example: 'Digite texto, finalize com EOF em nova linha',
      },
      {
        command: 'cat << \'EOF\' > script.sh\n#!/bin/bash\necho "Hello"\nEOF',
        description: 'Cria script com heredoc',
      },
      {
        command: 'cat arquivo1.txt arquivo2.txt > combinado.txt',
        description: 'Concatena arquivos em um novo',
      },
      {
        command: 'cat arquivo.txt | grep "texto"',
        description: 'Busca texto no arquivo',
      },
      {
        command: 'cat arquivo.txt | less',
        description: 'Visualiza com paginação',
      },
      {
        command: 'cat arquivo.txt | head -20',
        description: 'Primeiras 20 linhas',
      },
      {
        command: 'cat arquivo.txt | tail -20',
        description: 'Últimas 20 linhas',
      },
      {
        command: 'cat arquivo.txt | wc -l',
        description: 'Conta linhas do arquivo',
      },
      {
        command: 'cat arquivo.txt | sort',
        description: 'Ordena linhas',
      },
      {
        command: 'cat arquivo.txt | uniq',
        description: 'Remove linhas duplicadas adjacentes',
      },
      {
        command: 'cat /dev/null > arquivo.txt',
        description: 'Esvazia arquivo mantendo-o',
      },
      {
        command: 'cat /etc/passwd',
        description: 'Visualiza usuários do sistema',
      },
      {
        command: 'cat /etc/hosts',
        description: 'Visualiza mapeamento de hosts',
      },
      {
        command: 'cat /proc/cpuinfo',
        description: 'Informações da CPU',
      },
      {
        command: 'cat /proc/meminfo',
        description: 'Informações de memória',
      },
      {
        command: 'tac arquivo.txt',
        description: 'Exibe arquivo invertido (última linha primeiro)',
      },
      {
        command: 'zcat arquivo.txt.gz',
        description: 'Visualiza arquivo compactado (.gz)',
      },
      {
        command: 'cat - arquivo.txt',
        description: 'Lê stdin e depois arquivo',
      },
      {
        command: 'cat arquivo.txt | tr "a-z" "A-Z"',
        description: 'Converte para maiúsculas',
      },
      {
        command: 'cat arquivo.txt | nl',
        description: 'Numera linhas (alternativa)',
      },
    ],
  },
];
