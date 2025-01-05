FROM node:23 

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]