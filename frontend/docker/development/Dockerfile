FROM node:20.9

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY ./frontend .

EXPOSE 3000