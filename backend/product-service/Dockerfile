
FROM node:alpine


WORKDIR /app

COPY . .

COPY .env .env

RUN npm install


EXPOSE 3001


CMD ["npm", "start"]