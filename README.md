# Aplicação Docker

Uma aplicação para aprender os conceitos fundamentais de Docker, containerização e como empacotar aplicações Node.js em imagens Docker.

## Índice

- [O que é Docker?](#o-que-é-docker)
- [Conceitos Principais](#conceitos-principais)
- [Estrutura do Dockerfile](#estrutura-do-dockerfile)
- [Como Usar](#como-usar)
- [Comandos Essenciais](#comandos-essenciais)
- [Versionamento e Docker Hub](#versionamento-e-docker-hub)
- [Troubleshooting](#troubleshooting)
- [Recursos Adicionais](#recursos-adicionais)

## O que é Docker?

Docker é uma plataforma de containerização que permite empacotar sua aplicação, dependências e configurações em um formato padronizado e portátil.

### Benefícios:
- **Consistência**: Funciona igual em qualquer ambiente (desenvolvimento, teste, produção)
- **Portabilidade**: Execute em qualquer máquina que tenha Docker instalado
- **Isolamento**: Cada container é independente e isolado
- **Eficiência**: Usa menos recursos que máquinas virtuais tradicionais
- **Escalabilidade**: Facilita o deploy e gerenciamento de múltiplas instâncias

## Conceitos Principais

### Imagem Docker
Uma imagem é um **template** ou **receita** que contém:
- Sistema operacional base
- Dependências da aplicação
- Código-fonte
- Configurações
- Comandos para executar

### Container
Um container é uma **instância em execução** de uma imagem Docker. É como um processo isolado que roda sua aplicação.

### Dockerfile
Um arquivo de texto que contém as instruções para construir uma imagem Docker. É como uma receita passo a passo.

## Estrutura do Dockerfile

Aqui estão os passos necessários para criar uma imagem Docker:

### **FROM** - Definir Imagem Base
```dockerfile
FROM node:18-alpine
```
Define a imagem base que será usada. Neste caso, usamos Node.js versão 18 em uma distribuição Alpine (mais leve).

### **WORKDIR** - Diretório de Trabalho
```dockerfile
WORKDIR /app
```
Define o diretório de trabalho dentro do container. Todos os comandos subsequentes serão executados aqui.

### **COPY** - Copiar package.json
```dockerfile
COPY package.json .
```
Copia o arquivo `package.json` do seu computador para dentro do container.

### **RUN** - Instalar Dependências
```dockerfile
RUN npm install
```
Executa o comando `npm install` dentro do container para instalar todas as dependências.

### **COPY** - Copiar Código-Fonte
```dockerfile
COPY . .
```
Copia todos os arquivos do seu projeto para dentro do container.

### **EXPOSE** - Mapear Porta
```dockerfile
EXPOSE 3000
```
Documenta qual porta a aplicação irá usar. Não expõe automaticamente, apenas documenta.

### **CMD** - Comando Padrão
```dockerfile
CMD ["npm", "run", "dev"]
```
Define o comando que será executado quando o container iniciar.

---

## 📦 Exemplo Completo de Dockerfile

```dockerfile
# 1. Definir imagem base
FROM node:18-alpine

# 2. Definir diretório de trabalho
WORKDIR /app

# 3. Copiar package.json
COPY package.json .

# 4. Instalar dependências
RUN npm install

# 5. Copiar código-fonte
COPY . .

# 6. Expor porta
EXPOSE 3000

# 7. Comando padrão
CMD ["npm", "run", "dev"]
```

---

## Como Usar

### Pré-requisitos
- Docker instalado em sua máquina ([Baixar Docker](https://www.docker.com/products/docker-desktop))
- Uma aplicação Node.js com `package.json`
- Terminal/CMD aberto no diretório do projeto

### Passo 1: Construir a Imagem

```bash
docker build -t next-hello-world .
```

**Explicação dos flags:**
- `-t` : Define um nome (tag) para a imagem
- `.` : Usa o Dockerfile do diretório atual

**Saída esperada:**
```
[+] Building 45.2s (8/8) FINISHED
 => [internal] load build definition from Dockerfile
 => [1/7] FROM node:18-alpine
 => [2/7] WORKDIR /app
 ...
 => => naming to docker.io/library/next-hello-world:latest
```

### Passo 2: Executar o Container

```bash
docker run -p 3000:3000 next-hello-world
```

**Explicação dos flags:**
- `-p 3000:3000` : Mapeia a porta
  - Primeira `3000` : Porta do seu computador (localhost)
  - Segunda `3000` : Porta dentro do container
- `next-hello-world` : Nome da imagem a executar

### Passo 3: Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

---

## 🛠️ Comandos Essenciais

### Construir Imagem
```bash
# Build básico
docker build -t nome-da-imagem .

# Build com múltiplas tags
docker build -t nome-da-imagem:1.0 -t nome-da-imagem:latest .

# Build com arquivo Dockerfile customizado
docker build -f Dockerfile.prod -t nome-da-imagem:prod .
```

### Executar Container
```bash
# Execução básica
docker run nome-da-imagem

# Com mapeamento de porta
docker run -p 3000:3000 nome-da-imagem

# Em modo detached (background)
docker run -d -p 3000:3000 nome-da-imagem

# Com nome customizado
docker run --name meu-container -p 3000:3000 nome-da-imagem

# Com variáveis de ambiente
docker run -e NODE_ENV=production -p 3000:3000 nome-da-imagem
```

### Listar Imagens
```bash
docker images
```

### Listar Containers
```bash
# Containers em execução
docker ps

# Todos os containers (incluindo parados)
docker ps -a

# Últimos 5 containers
docker ps -n 5
```

### Parar Container
```bash
docker stop nome-ou-id-do-container

# Parar todos os containers
docker stop $(docker ps -q)
```

### Remover Container
```bash
docker rm nome-ou-id-do-container

# Remover container em execução
docker rm -f nome-ou-id-do-container

# Remover todos os containers parados
docker container prune
```

### Remover Imagem
```bash
docker rmi nome-da-imagem

# Remover imagem mesmo se estiver em uso
docker rmi -f nome-da-imagem

# Remover todas as imagens não utilizadas
docker image prune
```

### Ver Logs
```bash
docker logs nome-ou-id-do-container

# Acompanhar logs em tempo real
docker logs -f nome-ou-id-do-container
```

## Troubleshooting

### Erro: "Port 3000 is already allocated"
**Problema:** Outra aplicação está usando a porta 3000.

**Solução 1:** Use uma porta diferente
```bash
docker run -p 3001:3000 next-hello-world
```

**Solução 2:** Parar o container que está usando a porta
```bash
# Encontrar qual container está usando a porta
docker ps

# Parar o container
docker stop id-do-container
```

### Erro: "Cannot find module"
**Problema:** Dependências não foram instaladas corretamente.

**Solução:**
```bash
# Certifique-se de que o package.json está no diretório raiz
# Reconstrua a imagem
docker build --no-cache -t next-hello-world .
```

### Container para imediatamente após iniciar
**Problema:** Erro na aplicação ou comando inválido.

**Solução:** Verifique os logs
```bash
docker logs nome-do-container

# Ver logs com mais detalhes
docker logs -f nome-do-container
```

## Recursos Adicionais

- [Documentação Oficial do Docker](https://docs.docker.com/)
- [Docker Hub - Imagens Prontas](https://hub.docker.com/)
- [Node.js Official Images](https://hub.docker.com/_/node)
- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## Dicas de Boas Práticas

1. **Nomeie suas imagens**: Use nomes descritivos e versionamento semântico
2. **Teste localmente**: Sempre teste o container antes de fazer deploy
3. **Use .dockerignore**: Exclua arquivos desnecessários (node_modules, .git, etc)
4. **Mantenha imagens leves**: Use Alpine Linux quando possível
5. **Não rode como root**: Configure um usuário não-root no Dockerfile
6. **Use multi-stage builds**: Para reduzir o tamanho final da imagem
7. **Documente suas imagens**: Adicione comentários no Dockerfile
8. **Versione suas imagens**: Use tags para rastrear mudanças
9. **Faça backup**: Sempre tenha suas imagens no Docker Hub
10. **Atualize regularmente**: Mantenha as imagens base atualizadas

## Suporte

Se tiver dúvidas ou problemas:

1. Consulte a [documentação oficial](https://docs.docker.com/)
2. Procure no [Stack Overflow](https://stackoverflow.com/questions/tagged/docker)