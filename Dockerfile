FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.* ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]