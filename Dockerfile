# Usando a imagem do Cypress
FROM cypress/included:12.17.1

# Diretório de trabalho dentro do container
WORKDIR /e2e

# Copia os arquivos de dependências primeiro (para usar cache eficiente)
COPY package.json package-lock.json ./

# Instala as dependências do projeto, incluindo mochawesome
RUN npm install mochawesome --save-dev

# Copia o restante dos arquivos do projeto
COPY . .

# Exposição do volume para resultados
VOLUME ["/e2e/results"]
