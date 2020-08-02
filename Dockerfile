FROM node:12.3.1
WORKDIR /home/node/app
COPY package*.json ./
COPY . ./
EXPOSE 3000
