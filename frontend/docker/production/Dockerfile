FROM node:20.9 AS build-stage

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:20.9-slim

WORKDIR /app

COPY --from=build-stage /app/.output ./

ENV PORT 8080
EXPOSE 8080

CMD ["node", "./server/index.mjs"]
