FROM node:20.9

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm exec playwright install

RUN pnpm playwright install --with-deps

RUN pnpm exec playwright install msedge

RUN pnpm exec playwright install chrome

COPY ./frontend .

EXPOSE 3000