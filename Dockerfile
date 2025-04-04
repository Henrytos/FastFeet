FROM node

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

RUN npm install && npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]