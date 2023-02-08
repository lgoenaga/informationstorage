FROM node:18-buster

WORKDIR /usr/src/appreact

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
