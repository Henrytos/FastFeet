FROM node

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start:dev"]