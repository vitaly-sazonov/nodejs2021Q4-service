FROM node:lts-alpine3.15

EXPOSE ${PORT}

WORKDIR /home/app/

COPY package*.json tsconfig.json ./

COPY typings ./typings

RUN npm ci --production

RUN npm install -g nodemon


CMD ["npm", "run", "dev"] 