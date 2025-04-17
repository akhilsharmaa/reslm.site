FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon 
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "serve"]