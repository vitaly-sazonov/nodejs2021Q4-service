FROM node:lts-alpine3.15

EXPOSE ${PORT}

WORKDIR /home/app/

COPY package*.json tsconfig.json tsconfig.build.json ./

COPY typings ./typings

RUN npm ci
