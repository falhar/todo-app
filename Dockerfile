FROM node:18.7.0

WORKDIR /app

COPY package*.json ./

RUN npm i -g sequelize-cli

RUN npm i --only=prod

COPY . .

ENV NODE_ENV production
ENV PORT 3030
ENV DB_DRIVER mysql
ENV MYSQL_HOST 172.17.0.1
ENV MYSQL_PORT 3306
ENV MYSQL_USER root
ENV MYSQL_PASSWORD root
ENV MYSQL_DBNAME to-do-app

EXPOSE 8090
ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]