FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm","run", "deploy"]
