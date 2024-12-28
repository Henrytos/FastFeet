FROM node:18.15.0

WORKDIR /app 

COPY package*.json .

RUN apt-get update && apt-get install -y libssl-dev \
  && npm install 

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]
