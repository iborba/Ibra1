FROM node:20-slim

# Instalar dependências do Puppeteer/Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Configurar Puppeteer para usar Chromium instalado
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Copiar código fonte
COPY tsconfig.json ./
COPY src/ ./src/

# Instalar devDependencies para compilar TypeScript
RUN npm install --save-dev typescript ts-node @types/node @types/node-cron && \
    npx tsc && \
    npm prune --production

# Criar diretório de logs
RUN mkdir -p logs

# Usuário não-root para segurança
RUN groupadd -r agent && useradd -r -g agent -G audio,video agent && \
    chown -R agent:agent /app
USER agent

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD node -e "console.log('healthy')" || exit 1

# Executar em modo agendado por padrão
CMD ["node", "dist/index.js", "--mode=schedule"]
