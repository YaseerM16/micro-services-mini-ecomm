
FROM node:alpine


WORKDIR /app

COPY . .

COPY .env .env

RUN npm install


EXPOSE 3002


CMD ["npm", "start"]