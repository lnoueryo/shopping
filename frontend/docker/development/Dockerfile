FROM node:20.9

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm playwright install-deps

RUN pnpm exec playwright install chrome

RUN pnpm exec playwright install msedge

COPY ./frontend .

EXPOSE 3000