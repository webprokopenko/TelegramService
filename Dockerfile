FROM node:8

RUN apt-get update && npm i -g nodemon

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ./src /home/node/app

RUN npm install

RUN npm i node-telegram-bot-api

CMD [ "npm", "start" ]
