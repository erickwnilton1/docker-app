# Aplicação Docker

Uma aplicação para aprender os conceitos fundamentais de Docker, containerização e como empacotar aplicações Node.js em imagens Docker.

---

## Índice

- [O que é Docker?](#o-que-é-docker)
- [Conceitos Principais](#conceitos-principais)
- [Estrutura do Dockerfile](#estrutura-do-dockerfile)
- [Como Usar](#como-usar)
- [Comandos Essenciais](#comandos-essenciais)
- [Troubleshooting](#troubleshooting)

---

## O que é Docker?

Docker é uma plataforma de containerização que permite empacotar sua aplicação, dependências e configurações em um formato padronizado e portátil.

### Benefícios:
- **Consistência**: Funciona igual em qualquer ambiente (desenvolvimento, teste, produção)
- **Portabilidade**: Execute em qualquer máquina que tenha Docker instalado
- **Isolamento**: Cada container é independente e isolado
- **Eficiência**: Usa menos recursos que máquinas virtuais tradicionais

---

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

---

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

## 🚀 Como Usar

### Pré-requisitos
- Docker instalado em sua máquina
- Uma aplicação Node.js com `package.json`

### Passo 1: Construir a Imagem

```bash
docker build -t next-hello-world .
```

**Explicação dos flags:**
- `-t` : Define um nome (tag) para a imagem
- `.` : Usa o Dockerfile do diretório atual

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
```

### Parar Container
```bash
docker stop nome-ou-id-do-container
```

### Remover Container
```bash
docker rm nome-ou-id-do-container
```

### Remover Imagem
```bash
docker rmi nome-da-imagem
```

### Ver Logs
```bash
docker logs nome-ou-id-do-container

# Acompanhar logs em tempo real
docker logs -f nome-ou-id-do-container
```

---

## Troubleshooting

### Erro: "Port 3000 is already allocated"
**Solução:** Use uma porta diferente
```bash
docker run -p 3001:3000 next-hello-world
```

### Erro: "Cannot find module"
**Solução:** Certifique-se de que o `package.json` está no diretório raiz e execute `npm install` localmente também.

### Container para imediatamente após iniciar
**Solução:** Verifique os logs
```bash
docker logs nome-do-container
```

### Erro: "docker: command not found"
**Solução:** Docker não está instalado. Baixe em [docker.com](https://www.docker.com)

---

## Recursos Adicionais

- [Documentação Oficial do Docker](https://docs.docker.com/)
- [Docker Hub - Imagens Prontas](https://hub.docker.com/)
- [Node.js Official Images](https://hub.docker.com/_/node)

---

## Dicas de Boas Práticas

1. **Nomeie suas imagens**: Use nomes descritivos e versionamento
2. **Teste localmente**: Sempre teste o container antes de fazer deploy