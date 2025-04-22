FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon 
COPY . .
RUN npm run build
RUN (cd src && \
        npx prisma generate)
EXPOSE 8000
CMD ["npm", "run", "serve"]