FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y graphicsmagick

COPY package*.json ./
RUN npm install
RUN npm install -g pm2

COPY . .

RUN npx prisma generate 
RUN npm run build

EXPOSE 8000

CMD ["pm2-runtime", "start", "npm", "--", "run", "serve"]
