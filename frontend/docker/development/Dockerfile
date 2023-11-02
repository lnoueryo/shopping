FROM node:20.9

WORKDIR /usr/src/app/frontend

COPY ./frontend/package.json /usr/src/app/frontend/package.json

COPY ./frontend/pnpm-lock.yaml /usr/src/app/frontend/pnpm-lock.yaml

RUN npm install -g pnpm

RUN pnpm install