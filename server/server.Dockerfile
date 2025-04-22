FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y \
    graphicsmagick \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
RUN npm install -g pm2

COPY . .

RUN npm run build

RUN (cd src && \
    npx prisma generate)

EXPOSE 8000

CMD ["pm2-runtime", "start", "npm", "--", "run", "serve"]
