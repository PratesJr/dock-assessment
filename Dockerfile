FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=development
ENV NODE_ENV='development'
ENV DB_NAME='postgres'
ENV DB_USER='postgres'
ENV DB_PASSWORD='postgrespostgres'
ENV DB_HOST='localhost'
ENV DB_PORT='5433'
ENV REDIS_PORT='6378'
ENV REDIS_DB_NAME='0'
ENV REDIS_DB_PWD='redisPWD'
ENV REDIS_HOST='localhost'
ENV REDIS_TTL='600'


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
