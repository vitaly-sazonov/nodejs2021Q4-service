FROM node:lts-alpine3.15

EXPOSE ${PORT}

WORKDIR /home/app/

COPY package*.json tsconfig.json ./

RUN npm ci
