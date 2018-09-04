FROM node:8

RUN apt-get update && npm i -g nodemon

RUN mkdir -p /home/node/app
RUN mkdir -p /home/node/app/node_modules

COPY ./base/package.json /home/node/app/package.json
COPY ./base/package-lock.json /home/node/app/package-lock.json

RUN chown -R node:node /home/node/app/node_modules

WORKDIR /home/node/app

RUN  npm install

CMD [ "npm", "start" ]
