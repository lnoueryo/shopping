FROM python:3.11-slim-buster

WORKDIR /usr/src/app/backend

RUN apt-get update && apt-get install -y curl

RUN curl -sSL https://install.python-poetry.org | python3 -

ENV PATH="/root/.local/bin:$PATH"